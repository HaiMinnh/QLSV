export function kiemTraRong(value, selectorError, name) {
    if (value.trim() === '') {
        document.querySelector(selectorError).innerHTML = `${name} không được bỏ trống !`;
        return false;
    }
    document.querySelector(selectorError).innerHTML = '';
    return true;
}

export function kiemTraSo(value, selectorError, name) {
    let regexNumber = /^[0-9]+$/;
    if (regexNumber.test(value)) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = `${name} phải là số !`;
    return false;
}

export function kiemTraEmail(value, selectorError, name) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regexEmail.test(value)) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = `${name} không hợp lệ!`;
    return false;
}

export function kiemTraSoDienThoai(value, selectorError, name) {
    let regexPhone = /^(0[3|5|7|8|9])+([0-9]{8})\b/;
    if (regexPhone.test(value)) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = `${name} không hợp lệ!`;
    return false;
}

export function kiemTraName(value, selectorError, name) {
    let regexName = /^[A-Za-z]/;
    if (regexName.test(value)) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = `${name} không hợp lệ!`;
    return false;
}

export function kiemTraDoDai(value, selectorError, name, min, max) {
    let length = value.length
    if (length > max || length < min) {
        document.querySelector(selectorError).innerHTML = `${name} từ ${min} - ${max} ký tự`;
        return false;
    }
    document.querySelector(selectorError).innerHTML = ``;
    return true;
}

export function resetForm() {
    dom("#maSinhVien").value = "";
    dom("#tenSinhVien").value = "";
    dom("#soDienThoai").value = "";
    dom("#email").value = "";
    dom("#diemToan").value = "";
    dom("#diemLy").value = "";
    dom("#diemHoa").value = "";
    dom("#diemRenLuyen").value = "";
}

function dom(selector) {
    return document.querySelector(selector);
}
