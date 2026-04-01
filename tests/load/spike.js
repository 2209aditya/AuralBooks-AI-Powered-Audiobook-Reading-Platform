import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 100 },
    { duration: '30s', target: 500 },
    { duration: '1m', target: 100 }
  ]
};

export default function () {
  http.get('http://localhost:8080/api/v1/books');
  sleep(1);
}