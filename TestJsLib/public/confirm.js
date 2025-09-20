import $ from 'jquery-confirm';
window.jQuery = window.$ = $;
import "jquery-confirm/dist/jquery-confirm.min.css";


export const testConfirm = (title, message, onSuccess = null, onCancel = null) => {
    $().confirm({
        title: title,
        content: message,
        useBootstrap: false,
        buttons: {
            'confirm':
            {
                text: 'Yes',
                action: function () {
                    if (onSuccess != null)
                        onSuccess();
                }
            },
            cancel: function () {
                if (onCancel != null)
                    onCancel();
            }
        }
    });
};

