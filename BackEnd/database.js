import postgres from 'postgres';
const sql = postgres('postgres://root:root@192.168.1.15:5432/Sonho_Real');
export default sql;