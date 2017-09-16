package com.pengbo.sample.address;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.UnknownHostException;

public class LocalMac {
	
	private static boolean ready;   
	private static int number;    
	
	private static class ReaderThread extends Thread {        
		public void run() {          
			while (!ready)               
				Thread.yield();
			System.out.println(number);
			}    
		}

	/**
	 * @param args
	 * @throws UnknownHostException
	 * @throws SocketException
	 */
	public static void main(String[] args) throws UnknownHostException,
			SocketException {
		new ReaderThread().start();      
		number = 42;       
		ready = true;

		// 得到IP，输出PC-201309011313/122.206.73.83
//		InetAddress ia = InetAddress.getLocalHost();
//		System.out.println(ia);
//		getLocalMac(ia);
//		getAllLocalHostIP();
	}

	private static void getLocalMac(InetAddress ia) throws SocketException {
		// TODO Auto-generated method stub
		// 获取网卡，获取地址
		byte[] mac = NetworkInterface.getByInetAddress(ia).getHardwareAddress();
		System.out.println("mac数组长度：" + mac.length);
		StringBuffer sb = new StringBuffer("");
		for (int i = 0; i < mac.length; i++) {
			if (i != 0) {
				sb.append("-");
			}
			// 字节转换为整数
			int temp = mac[i] & 0xff;
			String str = Integer.toHexString(temp);
			System.out.println("每8位:" + str);
			if (str.length() == 1) {
				sb.append("0" + str);
			} else {
				sb.append(str);
			}
		}
		System.out.println("本机MAC地址:" + sb.toString().toUpperCase());
	}

	public static String[] getAllLocalHostIP() {
		String[] ret = null;
		try {
			String hostName = InetAddress.getLocalHost().getHostName();
			if (hostName.length() > 0) {
				InetAddress[] addrs = InetAddress.getAllByName(hostName);
				if (addrs.length > 0) {
					ret = new String[addrs.length];
					for (int i = 0; i < addrs.length; i++) {
						ret[i] = addrs[i].getHostAddress();
					}
				}
			}

		} catch (Exception ex) {
			ret = null;
		}
		return ret;
	}
}
