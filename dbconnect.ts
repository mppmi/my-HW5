import mysql from "mysql";
import util from "util";

export const conn = mysql.createPool({
	connectionLimit:15,
	host:"202.28.34.197",
	user:"web66_65011212117",
	password: "65011212117@csmsu",
	database: "web66_65011212117",
});
export const queryAsync = util.promisify(conn.query).bind(conn);