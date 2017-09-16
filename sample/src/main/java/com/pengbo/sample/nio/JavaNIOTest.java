package com.pengbo.sample.nio;

import java.io.IOException;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.Paths;

public class JavaNIOTest {

	public static void main(String[] args) throws IOException {

		Path path = Paths.get("C:\\Users\\pengbo01\\Desktop\\develop\\time.jpg");
		System.out.println(path.getRoot());
		System.out.println(path.getParent());
		System.out.println(path.getParent().toString());
		System.out.println(path.toString());
		System.out.println(path.getFileName());
		System.out.println(path.getNameCount());
		System.out.println(path.getName(path.getNameCount() - 1));

		Path realPath = path.toRealPath(LinkOption.NOFOLLOW_LINKS);
		System.out.println(realPath.getRoot());
		System.out.println(realPath);

	}

}
