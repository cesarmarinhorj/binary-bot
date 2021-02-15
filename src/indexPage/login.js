import { get as getStorage, set as setStorage } from '../common/utils/storageManager';
import { generateWebSocketURL, getDefaultEndpoint, generateTestLiveApiInstance } from '../common/appId';

const loginUser = $('#loginUser');
const passwordUser = $('#passwordUser');

if (document.location.href.endsWith('/login')) {
    window.location.replace(`${document.location.href}.html`);
    throw new Error('Unexpected URL.'); // To prevent URL replace in index and further execution
}

export default function login() {
    if (!document.location.href.match(/login\.html$/)) return false;
    $(document).ready(() => {
        $('#submitUser').click(validate);
    });
    return true;
}

function _validate() {
    const formData = new FormData();
    formData.append('type', 'login');
    formData.append('email', loginUser.value);
    formData.append('password', passwordUser.value);

    const fetchOption = {
            method: 'POST',
            body  : formData,
        },
        url = 'http://perfil.onebotmembers.com/authentication.php';

    return fetch(url, fetchOption)
        .then(response => {
            console.log(response);
            return response;
        })
        .then(response => response.json())
        .then(data => {
            console.table([data]);
            setStorage('config.user_id', data.user_id);

            // after login redirect to bot page
            window.location.href = '/bot.html?once';
            console.log('login', 'window.location.href', '/bot.html?once');
        })
        .catch(error => {
            alert("Login ou senha não conferem. Tente novamente.")
            console.error(error);
        });
}
