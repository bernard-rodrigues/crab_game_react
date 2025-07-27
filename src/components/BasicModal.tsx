import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

interface BasicModalProps{
    message: string
    isOpen: boolean
    closeModalFunction: () => void
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const BasicModal = (props: BasicModalProps) => {
  

  return (
    <div>
      <Modal
        open={props.isOpen}
        onClose={props.closeModalFunction}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description">
            {props.message}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
