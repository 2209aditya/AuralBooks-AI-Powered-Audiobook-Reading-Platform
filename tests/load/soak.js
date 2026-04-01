import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 50,
  duration: '30m'
};

export default function () {
  http.get('http://localhost:8080/api/v1/books');
  sleep(1);
}