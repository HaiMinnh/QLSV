import {  kiemTraDoDai, kiemTraEmail, kiemTraName, kiemTraRong, kiemTraSo, kiemTraSoDienThoai, resetForm } from "./method.js";
import { SinhVien } from "./models/SinhVien.js";

async function getAllSinhVienAsync() {
    const response = await fetch('https://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien');
    const data = await response.json();
    renderTableSinhVien(data);
};

window.renderTableSinhVien = function (arrSV) {//input là mảng
    let htmlString = '';
    for (let sv of arrSV) {
        htmlString += `
        <tr>
            <td>${sv.maSinhVien}</td>
            <td>${sv.tenSinhVien}</td>
            <td>${sv.soDienThoai}</td>
            <td>${sv.email}</td>
            <td>${sv.diemToan}</td>
            <td>${sv.diemLy}</td>
            <td>${sv.diemHoa}</td>
            <td>${sv.diemRenLuyen}</td>
            <td>${sv.loaiSinhVien}</td>
            <td>
                <button class='btn btn-primary mx-2' onclick="chinhSua('${sv.maSinhVien}')">Chỉnh sửa</button>
                <button class='btn btn-danger' onclick="xoaSinhVien('${sv.maSinhVien}')">Xoá</button>
            </td>
        </tr>
        `
    }
    //output: in ra giao diện
    document.querySelector('tbody').innerHTML = htmlString;
    return htmlString;
};

document.querySelector('#frmSinhVien').onsubmit = async function (e) {
    e.preventDefault();
    //input: Dữ liệu người dùng nhập từ form
    let sv = new SinhVien();
    let arrInput = document.querySelectorAll('#frmSinhVien .form-control');
    for (let input of arrInput) {
        sv[input.id] = input.value;
    }
    let { maSinhVien, tenSinhVien, soDienThoai, email, diemHoa, diemLy, diemToan, diemRenLuyen, loaiSinhVien } = sv;

    let valid = true;
    for (let key in sv) {
        valid &= kiemTraRong(sv[key], `#err_required_${key}`, key);
    }
    
    //Kiểm tra định dạng số (regex number)
    let arrInputNumber = document.querySelectorAll('.form-control[data-type=number]')
    for (let inputNumber of arrInputNumber) {
        let { id } = inputNumber; //Lấy ra id của thẻ
        let selector = document.querySelector(`[data-id=${id}]`);
        valid &= kiemTraSo(sv[id], `#${selector.id}`, id);
    }
    //Kiểm tra định dạng tên
    valid &= kiemTraName(tenSinhVien, '#err_regexName_tenSinhVien', 'Tên sinh viên');
    //Kiểm tra số điện thoại
    valid &= kiemTraSoDienThoai(soDienThoai, '#err_regexPhone_soDienThoai', 'Số điện thoại');
    //Kiểm tra Email
    valid &= kiemTraEmail(email, '#err_regexEmail_email', 'Email');
    //Kiểm tra độ dài của giá trị 
    valid &= kiemTraDoDai(maSinhVien, '#err_min_max_length_maSinhVien', 'Mã sinh viên', 1, 5);
    //Kiểm tra giá trị
    
    if (!valid) {
        return;
    }

    const response = await fetch('https://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien', {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json'
        },
        body: JSON.stringify(sv)
    });
    const data = await response.json();
    console.log(data);
    getAllSinhVienAsync();
    resetForm();
}

window.xoaSinhVien = async function (id) {
    const response = await fetch(`https://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=${id}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    console.log(data);
    getAllSinhVienAsync();
}

window.chinhSua = async function (id) {
    const response = await fetch(`https://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=${id}`);
    console.log(response);
    const data = await response.json();
    console.log(data);
    let svEdit = data;
    let arrInput = document.querySelectorAll('#frmSinhVien .form-control');
    for (let input of arrInput) {
        input.value = svEdit[input.id];
    }
}

document.querySelector('#btnLuuThongTin').onclick = async function (e) {
    let sv = new SinhVien();
    let arrInput = document.querySelectorAll('#frmSinhVien .form-control');
    for (let input of arrInput) {
        sv[input.id] = input.value;
    }
    //sv = {maSinhVien,tenSinhVien,...} =>format backend qui định
    //url backend qui định
    const response = await fetch(`https://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=${sv.maSinhVien}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'Application/json'
        },
        body: JSON.stringify(sv)
    });
    const data = await response.json();
    console.log(data);
    getAllSinhVienAsync();
    resetForm();
}
