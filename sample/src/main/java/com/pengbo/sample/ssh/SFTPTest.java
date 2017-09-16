package com.pengbo.sample.ssh;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Properties;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.SftpException;

public class SFTPTest {
	
	public static void main(String[] args) throws JSchException, SftpException, IOException {
		String host = "123.57.48.109";
		int port = 22;
		String username = "root";
		String password = "Lzupb730619";
		SFTPTest test = new SFTPTest();
		JSch jsch = new JSch();
		Session sshSession = jsch.getSession(username, host, port);
		System.out.println("Session created.");
		sshSession.setPassword(password);
		Properties sshConfig = new Properties();
		sshConfig.put("StrictHostKeyChecking", "no");
		sshSession.setConfig(sshConfig);
		sshSession.connect();
		System.out.println("Session connected.");
		System.out.println("Opening Channel.");
		Channel channel = sshSession.openChannel("sftp");
		channel.connect();
		ChannelSftp sftp = (ChannelSftp) channel;
		sftp.cd("/alidata");
		File file=new File("D:\\temp\\test.txt");
		OutputStream out = new FileOutputStream(file);
		sftp.get("account.log", out);
		out.close();
	}
	

}
