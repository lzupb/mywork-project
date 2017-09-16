package com.pengbo.sample.ssh;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import ch.ethz.ssh2.Connection;
import ch.ethz.ssh2.Session;
import ch.ethz.ssh2.StreamGobbler;

public class SSHTest {

	private static Connection conn = null;

	public static void main(String[] args) throws IOException {

		SSHTest test = new SSHTest();
		conn = test.getConnection();
		
		test.printCommand("cd /alidata");
		test.printCommand("more  fmusicsqlbak.sql");

		if (conn != null) {
			conn.close();
		}

	}

	private Connection getConnection() throws IOException {
		String hostname = "123.57.48.109";
		int port = 22;
		conn = new Connection(hostname, port);
		conn.connect();
		String username = "root";
		String password = "Lzupb730619";
		boolean isAuthenticated = conn.authenticateWithPassword(username,
				password);
		if (isAuthenticated == false) {
			throw new IOException("Authentication failed.");

		}

		System.out.println("连接服务器成功！");
		return conn;
	}

	private void printCommand(String command) throws IOException {
		Session sess = conn.openSession();

		sess.execCommand(command);

		System.out.println("Here is some information about the remote host:");

		/*
		 * This basic example does not handle stderr, which is sometimes
		 * dangerous (please read the FAQ).
		 */

		InputStream stdout = new StreamGobbler(sess.getStdout());

		BufferedReader br = new BufferedReader(new InputStreamReader(stdout));

		while (true) {
			String line = br.readLine();
			if (line == null)
				break;
			System.out.println(line);
		}

		/* Show exit status, if available (otherwise "null") */

		System.out.println("ExitCode: " + sess.getExitStatus());

		/* Close this session */

		sess.close();

	}

}
