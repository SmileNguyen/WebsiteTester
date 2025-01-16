import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
      default: {
          executor: 'constant-vus',
          vus: 100,
          duration: '30s',
      },
  },
};

export default function () {
  http.get('http://localhost:3000/products');
  sleep(1);
}