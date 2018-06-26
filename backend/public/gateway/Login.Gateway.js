

$("#btnlogin").on("click", () => {
    var _email = $("#txtEmail").val();
    var _password = $("#txtPassword").val();

    var body = {
        email: _email,
        password: _password
    }

    $.ajax({
        url: 'http://localhost:5555/auth/signin',
        dataType: 'json',
        timeout: 10000,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(body)
    }).done((data) => {
        localStorage.access_token = data.token
        if (localStorage.access_token !== 'undefined') {
            $.ajax({
                url: 'http://localhost:5555/auth/secured',
                dataType: 'json',
                timeout: 10000,
                headers: {
                    'token': localStorage.access_token
                }
            }).done((data) => {
                alert('Login Success!!!')
                alert(data.payload.isAdmin)
                if (data.payload.isAdmin === 1) {
                    location.replace('admin/users')
                } else {
                    location.replace('/')
                }
            })
        } else {
            alert('Tài Khoản hoặc mật khẩu chưa chính xác, vui lòng nhập lại!!!')
        }
    })
})
