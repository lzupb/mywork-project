package com.pengbo.sample.ssh;

import java.io.IOException;

import ch.ethz.ssh2.Connection;
import ch.ethz.ssh2.SCPClient;

public class SSHTest2 {

	public static void main(String[] args) {
		String hostname = "123.57.48.109";
		String username = "root";
		String password = "Lzupb730619";

		try {
			/* Create a connection instance */

			Connection conn = new Connection(hostname);

			/* Now connect */

			conn.connect();

			/* Authenticate */

			boolean isAuthenticated = conn.authenticateWithPassword(username,
					password);

			if (isAuthenticated == false)
				throw new IOException("Authentication failed.");

			/* Create a session */

			SCPClient scpclient = conn.createSCPClient();
			
			scpclient.get("/alidata/account.log", "D:\\temp");

			/* Close the connection */

			conn.close();

		} catch (IOException e) {
			e.printStackTrace(System.err);
			System.exit(2);
		}
	}

}
