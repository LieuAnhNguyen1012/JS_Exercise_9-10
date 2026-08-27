class NhanVien {
    constructor(
        taiKhoan,
        hoTen,
        email,
        matKhau,
        ngayLam,
        luongCoBan,
        chucVu,
        gioLam
    ) {
        this.taiKhoan = taiKhoan;
        this.hoTen = hoTen;
        this.email = email;
        this.matKhau = matKhau;
        this.ngayLam = ngayLam;
        this.luongCoBan = Number(luongCoBan);
        this.chucVu = chucVu;
        this.gioLam = Number(gioLam);

        this.tongLuong = 0;
        this.xepLoai = "";
    }

    tinhTongLuong() {
        if (this.chucVu === "Giám đốc") {
            this.tongLuong = this.luongCoBan * 3;
        } else if (this.chucVu === "Trưởng phòng") {
            this.tongLuong = this.luongCoBan * 2;
        } else if (this.chucVu === "Nhân viên") {
            this.tongLuong = this.luongCoBan;
        }

        return this.tongLuong;
    }

    xepLoaiNhanVien() {
        if (this.gioLam >= 192) {
            this.xepLoai = "Xuất sắc";
        } else if (this.gioLam >= 176) {
            this.xepLoai = "Giỏi";
        } else if (this.gioLam >= 160) {
            this.xepLoai = "Khá";
        } else {
            this.xepLoai = "Trung bình";
        }

        return this.xepLoai;
    }
}