import type { CrabObject } from "../types/types";

interface Move {
    crabId: string;
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
}

interface GameState {
    crabs: CrabObject[];
    currentPlayer: number;
}

export class CrabMinimaxAI {
    private readonly BOARD_SIZE = 6;
    private readonly WIN_LENGTH = 4;
    
    // Pesos para a função de avaliação
    private readonly WEIGHTS = {
        WIN: 100000,
        IMMEDIATE_WIN: 50000,        // Movimento que ganha imediatamente
        BLOCK_OPPONENT_WIN: 25000,   // Bloquear vitória do oponente
        THREE_IN_ROW: 500,           // Muito mais agressivo
        BLOCK_THREE: 400,            // Bloquear 3 em linha do oponente
        TWO_IN_ROW: 50,
        BLOCK_TWO: 25,
        MOBILITY: 1                  // Reduzido, menos importante
    };

    /**
     * Função principal que retorna o melhor movimento para a IA
     * Agora com verificação prioritária de vitórias imediatas
     */
    public getBestMove(crabs: CrabObject[], aiPlayer: number, maxDepth: number): Move | null {
        // Primeiro, verifica se há uma vitória imediata disponível
        const possibleMoves = this.getAllPossibleMoves(crabs, aiPlayer);
        
        for (const move of possibleMoves) {
            const testState = this.applyMove({ crabs, currentPlayer: aiPlayer }, move);
            if (this.checkWinner(testState.crabs) === aiPlayer) {
                return move; // Joga imediatamente se pode ganhar
            }
        }
        
        // Se não há vitória imediata, verifica se precisa bloquear o oponente
        const opponent = aiPlayer === 1 ? 2 : 1;
        const opponentMoves = this.getAllPossibleMoves(crabs, opponent);
        
        for (const move of opponentMoves) {
            const testState = this.applyMove({ crabs, currentPlayer: opponent }, move);
            if (this.checkWinner(testState.crabs) === opponent) {
                // Procura um movimento nosso que bloqueie essa posição
                const blockingMoves = possibleMoves.filter(ourMove => 
                    ourMove.toX === move.toX && ourMove.toY === move.toY
                );
                if (blockingMoves.length > 0) {
                    return blockingMoves[0];
                }
            }
        }
        
        // Se não há jogadas críticas, usa o algoritmo Minimax normal
        const gameState: GameState = { crabs: [...crabs], currentPlayer: aiPlayer };
        const result = this.minimax(gameState, maxDepth, -Infinity, Infinity, true);
        return result.move;
    }

    /**
     * Algoritmo Minimax com poda Alfa-Beta
     */
    private minimax(
        gameState: GameState, 
        depth: number, 
        alpha: number, 
        beta: number, 
        maximizingPlayer: boolean
    ): { score: number; move: Move | null } {
        
        // Condições de parada
        const winner = this.checkWinner(gameState.crabs);
        if (winner !== 0) {
            return { 
                score: winner === gameState.currentPlayer ? this.WEIGHTS.WIN : -this.WEIGHTS.WIN, 
                move: null 
            };
        }
        
        if (depth === 0) {
            return { 
                score: this.evaluatePosition(gameState.crabs, gameState.currentPlayer), 
                move: null 
            };
        }

        const possibleMoves = this.getAllPossibleMoves(gameState.crabs, gameState.currentPlayer);
        
        if (possibleMoves.length === 0) {
            return { score: 0, move: null };
        }

        let bestMove: Move | null = null;

        if (maximizingPlayer) {
            let maxScore = -Infinity;
            
            for (const move of possibleMoves) {
                const newGameState = this.applyMove(gameState, move);
                const result = this.minimax(newGameState, depth - 1, alpha, beta, false);
                
                if (result.score > maxScore) {
                    maxScore = result.score;
                    bestMove = move;
                }
                
                alpha = Math.max(alpha, result.score);
                if (beta <= alpha) {
                    break; // Poda Alfa-Beta
                }
            }
            
            return { score: maxScore, move: bestMove };
        } else {
            let minScore = Infinity;
            
            for (const move of possibleMoves) {
                const newGameState = this.applyMove(gameState, move);
                const result = this.minimax(newGameState, depth - 1, alpha, beta, true);
                
                if (result.score < minScore) {
                    minScore = result.score;
                    bestMove = move;
                }
                
                beta = Math.min(beta, result.score);
                if (beta <= alpha) {
                    break; // Poda Alfa-Beta
                }
            }
            
            return { score: minScore, move: bestMove };
        }
    }

    /**
     * Função de avaliação da posição - mais agressiva e focada
     */
    private evaluatePosition(crabs: CrabObject[], player: number): number {
        let score = 0;
        
        // Primeiro, verifica movimentos críticos (vitória/bloqueio imediato)
        score += this.evaluateImmediateThreats(crabs, player);
        
        // Avalia linhas consecutivas com mais peso
        score += this.evaluateLines(crabs, player);
        
        // Avalia mobilidade (reduzido)
        score += this.evaluateMobility(crabs, player);
        
        return score;
    }

    /**
     * Avalia ameaças imediatas - vitórias e bloqueios críticos
     */
    private evaluateImmediateThreats(crabs: CrabObject[], player: number): number {
        let score = 0;
        const opponent = player === 1 ? 2 : 1;
        
        // Verifica se pode ganhar no próximo movimento
        const playerMoves = this.getAllPossibleMoves(crabs, player);
        for (const move of playerMoves) {
            const testState = this.applyMove({ crabs, currentPlayer: player }, move);
            if (this.checkWinner(testState.crabs) === player) {
                score += this.WEIGHTS.IMMEDIATE_WIN;
            }
        }
        
        // Verifica se precisa bloquear vitória do oponente
        const opponentMoves = this.getAllPossibleMoves(crabs, opponent);
        for (const move of opponentMoves) {
            const testState = this.applyMove({ crabs, currentPlayer: opponent }, move);
            if (this.checkWinner(testState.crabs) === opponent) {
                score += this.WEIGHTS.BLOCK_OPPONENT_WIN;
                break; // Uma ameaça de vitória é suficiente para priorizar bloqueio
            }
        }
        
        return score;
    }

    /**
     * Avalia linhas consecutivas com foco em ataque e defesa
     */
    private evaluateLines(crabs: CrabObject[], player: number): number {
        let score = 0;
        const opponent = player === 1 ? 2 : 1;
        
        // Avalia linhas horizontais
        for (let y = 0; y < this.BOARD_SIZE; y++) {
            for (let x = 0; x <= this.BOARD_SIZE - this.WIN_LENGTH; x++) {
                const lineScore = this.evaluateLine(crabs, player, x, y, 1, 0);
                const opponentLineScore = this.evaluateLine(crabs, opponent, x, y, 1, 0);
                score += lineScore - opponentLineScore * 0.8; // Defesa um pouco menos importante
            }
        }
        
        // Avalia linhas verticais
        for (let x = 0; x < this.BOARD_SIZE; x++) {
            for (let y = 0; y <= this.BOARD_SIZE - this.WIN_LENGTH; y++) {
                const lineScore = this.evaluateLine(crabs, player, x, y, 0, 1);
                const opponentLineScore = this.evaluateLine(crabs, opponent, x, y, 0, 1);
                score += lineScore - opponentLineScore * 0.8;
            }
        }
        
        return score;
    }

    /**
     * Avalia uma linha específica com pesos mais agressivos
     */
    private evaluateLine(
        crabs: CrabObject[], 
        player: number, 
        startX: number, 
        startY: number, 
        deltaX: number, 
        deltaY: number
    ): number {
        let playerCount = 0;
        let opponentCount = 0;
        let emptyCount = 0;
        
        for (let i = 0; i < this.WIN_LENGTH; i++) {
            const x = startX + i * deltaX;
            const y = startY + i * deltaY;
            const crab = crabs.find(c => c.x === x && c.y === y);
            
            if (crab) {
                if (crab.player === player) {
                    playerCount++;
                } else {
                    opponentCount++;
                }
            } else {
                emptyCount++;
            }
        }
        
        // Se há peças dos dois jogadores na linha, não é valiosa
        if (playerCount > 0 && opponentCount > 0) {
            return 0;
        }
        
        // Avaliação mais agressiva para o próprio jogador
        if (playerCount > 0 && opponentCount === 0) {
            if (playerCount === 3) return this.WEIGHTS.THREE_IN_ROW;
            if (playerCount === 2) return this.WEIGHTS.TWO_IN_ROW;
            if (playerCount === 1) return 5; // Pequeno bônus para começar uma linha
        }
        
        // Avaliação defensiva contra o oponente
        if (opponentCount > 0 && playerCount === 0) {
            if (opponentCount === 3) return -this.WEIGHTS.BLOCK_THREE;
            if (opponentCount === 2) return -this.WEIGHTS.BLOCK_TWO;
        }
        
        return 0;
    }

    /**
     * Avalia mobilidade (reduzida importância)
     */
    private evaluateMobility(crabs: CrabObject[], player: number): number {
        const playerMoves = this.getAllPossibleMoves(crabs, player).length;
        const opponentMoves = this.getAllPossibleMoves(crabs, player === 1 ? 2 : 1).length;
        
        return (playerMoves - opponentMoves) * this.WEIGHTS.MOBILITY;
    }

    /**
     * Obtém todos os movimentos possíveis para um jogador
     */
    private getAllPossibleMoves(crabs: CrabObject[], player: number): Move[] {
        const moves: Move[] = [];
        const playerCrabs = crabs.filter(crab => crab.player === player);
        
        for (const crab of playerCrabs) {
            const availableSquares = this.getAvailableSquares(crabs, { x: crab.x, y: crab.y });
            
            for (const square of availableSquares) {
                moves.push({
                    crabId: crab.id,
                    fromX: crab.x,
                    fromY: crab.y,
                    toX: square.x,
                    toY: square.y
                });
            }
        }
        
        return moves;
    }

    /**
     * Calcula as casas disponíveis para um caranguejo (baseado na lógica original)
     */
    private getAvailableSquares(crabs: CrabObject[], crabPosition: { x: number; y: number }): { x: number; y: number }[] {
        const availableSquares = [];
        const directions = [
            { dx: -1, dy: 0 }, // Esquerda
            { dx: 1, dy: 0 },  // Direita
            { dx: 0, dy: -1 }, // Cima
            { dx: 0, dy: 1 }   // Baixo
        ];

        for (const dir of directions) {
            let currentX = crabPosition.x;
            let currentY = crabPosition.y;

            while (true) {
                const nextX = currentX + dir.dx;
                const nextY = currentY + dir.dy;

                // Verifica se a próxima posição está fora dos limites
                if (nextX < 0 || nextX >= this.BOARD_SIZE || nextY < 0 || nextY >= this.BOARD_SIZE) {
                    // Última casa válida antes da parede
                    if (currentX !== crabPosition.x || currentY !== crabPosition.y) {
                        availableSquares.push({ x: currentX, y: currentY });
                    }
                    break;
                }

                // Verifica se outro caranguejo está na próxima posição
                const isOccupied = crabs.some(pos => pos.x === nextX && pos.y === nextY);

                if (isOccupied) {
                    // Última casa válida antes do caranguejo
                    if (currentX !== crabPosition.x || currentY !== crabPosition.y) {
                        availableSquares.push({ x: currentX, y: currentY });
                    }
                    break;
                }

                // Move para a próxima casa
                currentX = nextX;
                currentY = nextY;
            }
        }

        return availableSquares;
    }

    /**
     * Aplica um movimento ao estado do jogo
     */
    private applyMove(gameState: GameState, move: Move): GameState {
        const newCrabs = gameState.crabs.map(crab => {
            if (crab.id === move.crabId) {
                return { ...crab, x: move.toX, y: move.toY };
            }
            return { ...crab };
        });

        return {
            crabs: newCrabs,
            currentPlayer: gameState.currentPlayer === 1 ? 2 : 1
        };
    }

    /**
     * Verifica se há um vencedor (baseado na lógica original)
     */
    private checkWinner(crabs: CrabObject[]): number {
        // Verifica linhas horizontais
        for (let y = 0; y < this.BOARD_SIZE; y++) {
            for (let x = 0; x <= this.BOARD_SIZE - this.WIN_LENGTH; x++) {
                const rowCrabs = crabs.filter(crab => 
                    crab.y === y && crab.x >= x && crab.x < x + this.WIN_LENGTH
                );
                if (rowCrabs.length === this.WIN_LENGTH) {
                    if (rowCrabs.every(crab => crab.player === 1)) {
                        return 1;
                    } else if (rowCrabs.every(crab => crab.player === 2)) {
                        return 2;
                    }
                }
            }
        }

        // Verifica linhas verticais
        for (let x = 0; x < this.BOARD_SIZE; x++) {
            for (let y = 0; y <= this.BOARD_SIZE - this.WIN_LENGTH; y++) {
                const colCrabs = crabs.filter(crab => 
                    crab.x === x && crab.y >= y && crab.y < y + this.WIN_LENGTH
                );
                if (colCrabs.length === this.WIN_LENGTH) {
                    if (colCrabs.every(crab => crab.player === 1)) {
                        return 1;
                    } else if (colCrabs.every(crab => crab.player === 2)) {
                        return 2;
                    }
                }
            }
        }

        return 0; // Sem vencedor
    }
}

// Hook para usar a IA no componente Board
export const useAIPlayer = () => {
    const ai = new CrabMinimaxAI();
    
    const makeAIMove = (
        crabs: CrabObject[], 
        aiPlayer: number, 
        setCrabs: Function, 
        togglePlayer: Function,
        maxDepth: number,
        setIsAIThinking?: Function
    ) => {
        // Marca que a IA está "pensando" para evitar múltiplas jogadas
        if (setIsAIThinking) setIsAIThinking(true);
        
        // Adiciona um pequeno delay para simular "pensamento" da IA
        setTimeout(() => {
            const bestMove = ai.getBestMove(crabs, aiPlayer, maxDepth);
            
            if (bestMove) {
                // Aplica o movimento da IA
                setCrabs((prevCrabs: CrabObject[]) => 
                    prevCrabs.map(crab => 
                        crab.id === bestMove.crabId 
                            ? { ...crab, x: bestMove.toX, y: bestMove.toY, active: false }
                            : crab
                    )
                );
                
                // Muda para o próximo jogador após o movimento
                setTimeout(() => {
                    togglePlayer();
                    if (setIsAIThinking) setIsAIThinking(false);
                }, 100);
            } else {
                if (setIsAIThinking) setIsAIThinking(false);
            }
        }, 800);
    };
    
    return { makeAIMove };
};