import { confirmAlert } from 'react-confirm-alert';

export const confirm = (options: {
    title: string
    message: React.ReactNode
    onConfirm: ()=>any
    renderedMessage?: ()=>React.ReactNode
}) =>{
    confirmAlert({
        title: options.title,
        // message: options.message,
        buttons: [
            {
                label: 'Confirm', className:"button green",
                onClick: options.onConfirm
            },
            {
                label: 'Cancel', className:"button cancel",
                // onClick: options.onConfirm
            }
        ],
        childrenElement: ()=>options.message
    })
}