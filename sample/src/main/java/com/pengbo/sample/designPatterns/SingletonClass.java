package com.pengbo.sample.designPatterns;

/**
 * Created by pengbo01 on 2016/12/5.
 */
public class SingletonClass {

    private SingletonClass() {

    }

    private static class HolderClass {
        private static final SingletonClass instance = new SingletonClass();
    }

    public static SingletonClass getInstance() {
        return HolderClass.instance;
    }

    public static void main(String[] args) {
        SingletonClass s2 = SingletonClass.getInstance();
        SingletonClass s3 = SingletonClass.getInstance();
        System.out.println(s2 == s3);
    }
}
