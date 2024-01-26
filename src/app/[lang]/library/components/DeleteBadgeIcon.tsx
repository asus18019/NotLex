import CloseIcon from '@mui/icons-material/Close';

interface DeleteBadgeIconProps {
	itemId: string,
	handleDelete: (value: string) => void
}

const DeleteBadgeIcon = ({ itemId, handleDelete }: DeleteBadgeIconProps) => {
	return (
		<CloseIcon
			stroke='red'
			strokeWidth={ 2 }
			sx={{
				position: 'absolute',
				top: '-35%',
				right: '-9px',
				transition: '0.15s',
				cursor: 'pointer',
				fontSize: '23px',
				':hover': { stroke: 'darkred' }
			}}
			onClick={ () => handleDelete(itemId) }
		/>
	);
};

export default DeleteBadgeIcon;