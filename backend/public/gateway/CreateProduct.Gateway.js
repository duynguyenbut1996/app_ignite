$('#frm').submit(function () {
    $(this).ajaxSubmit({
        beforeSubmit: function (formData, jqForm, options) {
            console.log(formData)
            console.log(jqForm)
            console.log(options)
            alert('Uploading...');
        },
        success: function showResponse(responseText, statusText, xhr, $form) {
            alert(responseText);
        }
    });

    return false;
});


$("#btnCreateProduct").on("click", () => {
    var _category = $("select[id = txtCategory]").val()
    var _product = $("#txtProduct").val()
    var _priceNow = $("#txtPriceNow").val()
    var _pricePay = $("#txtPricePay").val()
    var _priceCost = $("#txtCost").val()
    var _priceDetail = $("#txtDetail").val()
    var _imageFirst = $("#txtImage1").val()
    var _imageSecond = $("#txtImage2").val()
    var _image3rd = $("#txtImage3").val()

    var flag = true;

    if (_product == '') {
        $('#tsp').text('Vui lòng nhập tên sản phẩm');
        flag = false;
    } else {
        $('#tsp').text('');
    }

    if (_priceNow == '') {
        $('#gbn').text('Vui lòng nhập giá bán ngay');
        flag = false;
    } else {
        $('#gbn').text('');
    }

    if (_pricePay == '') {
        $('#gbd').text('Vui lòng nhập giá bắt đầu');
        flag = false;
    } else {
        $('#gbd').text('')
    }

    if (_priceCost == '') {
        $('#gc1ld').text('Vui lòng nhập giá cho 1 lần đấu');
        flag = false;
    } else {
        $('#gc1ld').text('')
    }

    if (_priceDetail == '') {
        $('#detail').text('Vui lòng nhập thông tin sản phẩm');
        flag = false;
    } else {
        $('#detail').text('')
    }

    if (_product != '' && _priceNow != '' && _pricePay != '' && _priceCost != '' && _priceDetail != '') {
        flag = true;
    }

    if( flag === true) {
        var body = {
            ProductName: _product,
            PriceNow: _priceNow,
            PricePay: _pricePay,
            Cost: _priceCost,
            Detail: _priceDetail,
            category: _category
        }
    
        var img = {
            ImageFirst: _imageFirst.replace("C:\\fakepath\\", ""),
            ImageSecond: _imageSecond.replace("C:\\fakepath\\", ""),
            Image3rd: _image3rd.replace("C:\\fakepath\\", "")
        }
    
        $.ajax({
            url: 'http://localhost:5555/image',
            dataType: 'json',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(img)
        }).done((data) => {
            console.log(data)
            alert('Tạo sản phẩm đấu giá thành công, chờ admin duyệt')        
        })
    
        $.ajax({
            url: 'http://localhost:5555/product/create',
            dataType: 'json',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(body)
        }).done((data) => {
            
        })
    
    }
    return flag;
})