import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 100, // Số lượng người dùng ảo
    duration: '30s', // Thời gian chạy kiểm thử
};

export default function () {
  http.get('http://localhost:3000/products');
  sleep(1);
}