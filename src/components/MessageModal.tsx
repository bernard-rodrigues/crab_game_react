import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Slide from '@mui/material/Slide';
import { useContext } from 'react';
import { TurnContext } from '../contexts/TurnContext';
import { MenuButton } from './MenuButton';

interface MessageModalProps{
  message: string
  isOpen: boolean
  closeModalFunction: () => void
}

const style = {
  width: "auto",
  bgcolor: 'background.paper',
  border: '4px solid hsl(6, 10%, 19%)',
  boxShadow: 24,
  p: 4,
  textAlign: "center"
};

export const MessageModal = (props: MessageModalProps) => {
  const {gameState} = useContext(TurnContext);
  
  return (
    <Modal
      open={props.isOpen}
      onClose={props.closeModalFunction}
      aria-describedby="modal-modal-description"
      closeAfterTransition
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Slide in={props.isOpen} direction="down">
        <Box sx={style}>
          <Typography 
            id="modal-modal-description" 
            sx={{
              fontFamily: "'Ribeye', serif",
              color: "hsl(6, 10%, 19%)",
              fontSize: 20,
              userSelect: 'none'
            }}
          >
            {props.message}
          </Typography>
          {gameState === 4 ? 
          <div className='flex gap-3 justify-center'>
            <MenuButton gameState={gameState} title="Play again" isModal={true}/>
            <MenuButton gameState={0} title="Exit" isModal={true}/>
          </div> : <></>
          }
        </Box>
      </Slide>
    </Modal>
  );
}