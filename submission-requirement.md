# Ringkasan Kriteria Submission — Aplikasi Forum Diskusi

## Tujuan Akhir

- [ ] Membuat pengujian **Unit, Integration, dan End-to-End** pada aplikasi Forum Diskusi.
- [ ] Melakukan deployment aplikasi menggunakan teknik **CI/CD**.
- [ ] Memanfaatkan minimal **1 React Ecosystem** yang diperbolehkan.

---

# 1. Automation Testing

## Pengujian yang Wajib Dibuat

| Jenis Pengujian | Minimal | Keterangan                        |
| --------------- | ------: | --------------------------------- |
| Reducer         |       2 | Menguji fungsi reducer            |
| Thunk Function  |       2 | Menguji proses asynchronous/thunk |
| React Component |       2 | Menguji komponen React            |
| End-to-End      |       1 | Menguji alur login aplikasi       |

### Total Minimal

**7 pengujian/skenario utama**

- [ ] 2 pengujian Reducer
- [ ] 2 pengujian Thunk Function
- [ ] 2 pengujian React Component
- [ ] 1 pengujian End-to-End login

## Ketentuan

- [ ] Setiap berkas pengujian memiliki **skenario pengujian** yang jelas.
- [ ] Sebaiknya memilih unit yang kompleks untuk diuji.
- [ ] Pengujian dapat dijalankan menggunakan:

```bash
npm test
```

- [ ] Pengujian End-to-End dapat dijalankan menggunakan:

```bash
npm run e2e
```

---

# 2. Deployment — CI/CD

## Continuous Integration

Wajib menggunakan:

**GitHub Actions**

Pipeline minimal:

```text
Push / Pull Request
        ↓
GitHub Actions
        ↓
Install Dependencies
        ↓
Run Tests
        ↓
CI Check
```

- [ ] GitHub Actions sudah dikonfigurasi.
- [ ] GitHub Actions menjalankan automated testing.
- [ ] CI gagal apabila pengujian gagal.
- [ ] CI berhasil apabila seluruh pengujian berhasil.

## Continuous Deployment

Wajib menggunakan:

**Vercel**

- [ ] Aplikasi berhasil di-deploy ke Vercel.
- [ ] URL aplikasi Vercel dicantumkan pada submission.
- [ ] Deployment terintegrasi dengan repository.

---

# 3. Branch Protection

Branch utama:

```text
master
```

- [ ] Branch `master` diproteksi.
- [ ] Pull Request digunakan sebelum perubahan masuk ke `master`.
- [ ] CI check menjadi bagian dari proses proteksi branch.
- [ ] Repository harus **public** ketika melakukan konfigurasi/penilaian branch protection.

> Setelah proses penilaian selesai, repository dapat diubah kembali menjadi **private** untuk mengurangi risiko plagiarism.

---

# 4. Screenshot Bukti CI/CD

Wajib menyertakan **3 screenshot** di dalam ZIP proyek.

## 1_ci_check_error

- [ ] Menunjukkan CI Check **gagal**.
- [ ] Penyebab kegagalan berasal dari pengujian yang gagal.

```text
1_ci_check_error
```

## 2_ci_check_pass

- [ ] Menunjukkan CI Check **berhasil**.
- [ ] Seluruh pengujian berhasil dijalankan.

```text
2_ci_check_pass
```

## 3_branch_protection

- [ ] Menunjukkan konfigurasi **Branch Protection**.
- [ ] Menunjukkan proteksi terhadap branch `master`.

```text
3_branch_protection
```

---

# 5. React Ecosystem

Wajib menggunakan minimal:

**1 React Ecosystem** dari daftar React Ecosystem yang diberikan Dicoding.

Referensi:

https://github.com/dicodingacademy/awesome-react-ecosystem#react-tools

## Yang Tidak Dihitung

Library berikut **tidak dapat digunakan untuk memenuhi kriteria ecosystem**:

- [ ] Create React Apps
- [ ] Vite
- [ ] React Router
- [ ] React Icons
- [ ] Redux
- [ ] Redux Thunk
- [ ] Redux Toolkit
- [ ] Jest
- [ ] Vitest
- [ ] React Testing Library

> React Ecosystem yang dipilih harus benar-benar digunakan dalam aplikasi, bukan hanya dipasang sebagai dependency.

---

# 6. Mempertahankan Submission Sebelumnya

Aplikasi harus tetap memenuhi seluruh kriteria dari submission sebelumnya.

## Fungsionalitas Aplikasi

- [ ] Fitur utama aplikasi Forum Diskusi tetap berjalan.
- [ ] Tidak ada fitur submission sebelumnya yang rusak.

## Bugs Highlighting

- [ ] Fitur/implementasi **Bugs Highlighting** tetap dipertahankan.

## Arsitektur Aplikasi

- [ ] Arsitektur aplikasi sebelumnya tetap dipertahankan.
- [ ] Penambahan testing, CI/CD, dan ecosystem tidak merusak struktur aplikasi.

---

# 7. Checklist Final Sebelum Submission

## Testing

- [ ] `npm test` berhasil.
- [ ] `npm run e2e` berhasil.
- [ ] Minimal 2 test Reducer.
- [ ] Minimal 2 test Thunk.
- [ ] Minimal 2 test React Component.
- [ ] Minimal 1 test E2E login.
- [ ] Setiap file test memiliki skenario pengujian.

## React Ecosystem

- [ ] Minimal 1 React Ecosystem tambahan.
- [ ] Ecosystem bukan dari daftar yang dilarang.
- [ ] Ecosystem benar-benar digunakan dalam aplikasi.

## CI/CD

- [ ] GitHub Actions aktif.
- [ ] CI menjalankan testing.
- [ ] CI dapat menghasilkan status failed.
- [ ] CI dapat menghasilkan status passed.
- [ ] Vercel berhasil melakukan deployment.
- [ ] URL Vercel sudah dicatat.

## GitHub

- [ ] Branch `master` diproteksi.
- [ ] Pull Request digunakan.
- [ ] CI check terintegrasi dengan branch protection.

## Bukti Submission

- [ ] `1_ci_check_error`
- [ ] `2_ci_check_pass`
- [ ] `3_branch_protection`
- [ ] Screenshot berada di dalam ZIP proyek.
- [ ] URL Vercel dicantumkan pada submission.

## Submission Sebelumnya

- [ ] Fungsionalitas tetap berjalan.
- [ ] Bugs Highlighting tetap ada.
- [ ] Arsitektur aplikasi tetap dipertahankan.

---

# Target Struktur Akhir

```text
forum-discussion/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── states/
│   │   ├── actions/
│   │   ├── reducers/
│   │   └── ...
│   └── ...
│
├── tests/
│   ├── reducers/
│   ├── thunks/
│   ├── components/
│   └── ...
│
├── e2e/
│   └── login/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── screenshots/
│   ├── 1_ci_check_error.png
│   ├── 2_ci_check_pass.png
│   └── 3_branch_protection.png
│
├── package.json
└── ...
```

## Perintah Wajib

```bash
# Menjalankan Unit/Component Testing
npm test

# Menjalankan End-to-End Testing
npm run e2e
```

## Definisi Selesai

Submission dianggap siap apabila:

```text
Testing ✓
   ↓
npm test ✓
npm run e2e ✓
   ↓
GitHub Actions ✓
   ↓
Branch Protection ✓
   ↓
Vercel Deployment ✓
   ↓
React Ecosystem ✓
   ↓
Kriteria Submission Sebelumnya ✓
   ↓
ZIP + Screenshot + URL Vercel
   ↓
SUBMISSION
```
