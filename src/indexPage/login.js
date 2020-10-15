import { get as getStorage, set as setStorage } from '../common/utils/storageManager';
import { generateWebSocketURL, getDefaultEndpoint, generateTestLiveApiInstance } from '../common/appId';

if (document.location.href.endsWith('/login')) {
    window.location.replace(`${document.location.href}.html`);
    throw new Error('Unexpected URL.'); // To prevent URL replace in index and further execution
}

this.state = {
    validating: false,
};

export default function login() {
    if (!document.location.href.match(/login\.html/)) return false;
    $(document).ready(() => {
        $('#submitUser').click(validate);

        // init();
    });
    return true;
}

function validate() {
    const loginUser = $('#loginUser').value;
    const passwordUser = $('#passwordUser').value;

    // this.setState({ validating: true });

    const formData = new FormData();
    formData.append('type', 'login');
    formData.append('email', loginUser);
    formData.append('password', passwordUser);

    const fetchOption = {
            method: 'POST',
            // mode   : 'cors',
            // headers: { 'Content-Type': 'application/json' },
            body  : formData,
        },
        url = 'https://perfil.mbmaciel.com/authentication.php';
    console.log(url);

    return fetch(url, fetchOption)
        .then(response => response.json())
        .then(responseJson => {
            const data = responseJson.data;
            console.log(`data: ${data}`);

            if (this.saveToStorage(data)) {
                this.setState({
                    validating: false,
                });

                /* Redirect to accounts page */
                Actions.pageAccount();
            } else {
                console.log('Failed to store auth');
            }
        })
        .catch(error => {
            console.error(error);
        });
}
