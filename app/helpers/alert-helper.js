export const alertMessage = (name) => {
        const alertTitle = document.getElementById('alertTitle');
        const alertMessage = document.getElementById('alertMessage');
        const toastAlert = document.getElementById('toastAlert')
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastAlert)

        const messages = [
            {name: 'loginSuccess', title: 'Login efetuado', message: 'Login de usuário realizado com sucesso.'},
            {name: 'loginFail', title: 'Falha no login', message: 'Não foi possível realizar o login do usuário.'},
            
            {name: 'logoutSuccess', title: 'Logout efetuado', message: 'Conta de usuário não está mais aberta.'},
            {name: 'logoutFail', title: 'Logout efetuado com falha', message: 'Não foi possível identificar o usuário.'},
            
            {name: 'registerSuccess', title: 'Usuário registrado', message: 'O usuário foi registrado com sucesso.'},
            {name: 'registerFail', title: 'Usuário não registrado', message: 'Não foi possível registrar o usuário.'},
            
            {name: 'changePasswordSuccess', title: 'Senha alterada', message: 'Senha do usuário alterada com sucesso.'},
            {name: 'changePasswordFail', title: 'Senha não alterada', message: 'Não foi possível alterar a senha do usuário.'},

            {name: 'updatePreferencesSuccess', title: 'Preferências alteradas', message: 'Preferências do usuário alteradas com sucesso.'},
            {name: 'updatePreferencesFail', title: 'Preferências não alteradas', message: 'Não foi possível alterar as preferências do usuário.'},

            {name: '', title: '', message: ''},
            {name: '', title: '', message: ''},
            {name: '', title: '', message: ''},
            {name: '', title: '', message: ''}
        ]
        let obj = messages.find(e => e.name == name)
        alertTitle.innerHTML = obj.title;
        alertMessage.innerHTML = obj.message;
        toastBootstrap.show()
    }