package com.pengbo.sample.sort;

import java.util.HashSet;
import java.util.Set;

/**
 * @author pengbo01
 * 
 */
public class SimpleSort {
	
	private int[] quickSortArray;

	public static void main(String[] args) {
		SimpleSort sort = new SimpleSort();
		int[] beforeArray = sort.createRadomIntegerArray(100000);
		sort.quickSortArray = beforeArray;
		sort.bubbleSort(sort.cloneArray(beforeArray));
		sort.selectSort(sort.cloneArray(beforeArray));
		sort.insertSort(sort.cloneArray(beforeArray));
		sort.shellSort(sort.cloneArray(beforeArray));
		sort.quickSort(sort.cloneArray(beforeArray));
		System.out.println("a".compareTo("b"));
	}

	/**
	 * 冒泡排序
	 */
	private int[] bubbleSort(int[] array) {
		long current = System.currentTimeMillis();
		int limit = array.length - 1;
		while (limit > 0) {
			int index = 0;
			while (index < limit) {
				if (array[index] > array[index + 1]) {
					int tem = array[index];
					array[index] = array[index + 1];
					array[index + 1] = tem;
				}
				index++;
			}
			limit--;
		}
		System.out.println("bubbleOrder:"
				+ (System.currentTimeMillis() - current));
		printArray(array);
		return array;
	}

	/**
	 * 选择排序
	 */
	private int[] selectSort(int[] array) {
		long current = System.currentTimeMillis();

		for (int out = 0; out < array.length - 1; out++) {
			int min = out;
			for (int in = out + 1; in < array.length; in++) {
				if (array[in] < array[min]) {
					min = in;
				}
			}
			if (array[out] > array[min]) {
				int tem = array[out];
				array[out] = array[min];
				array[min] = tem;

			}

		}

		System.out.println("selectOrder:"
				+ (System.currentTimeMillis() - current));
		printArray(array);

		return array;
	}

	/**
	 * 插入排序
	 */
	private int[] insertSort(int[] array) {
		long current = System.currentTimeMillis();
		for (int out = 1; out < array.length; out++) {
			int temp = array[out];
			int in = out;
			while (in > 0 && array[in - 1] > temp) {
				array[in] = array[in - 1];
				in--;
			}
			array[in] = temp;
		}
		System.out.println("insertSort:"
				+ (System.currentTimeMillis() - current));
		printArray(array);
		return array;
	}
	
	/**
	 * 快速排序
	 */
	private int[] quickSort(int[] array) {
		long current = System.currentTimeMillis();		
		reQuickSort(0,array.length-1);
		System.out.println("quickSort:"
				+ (System.currentTimeMillis() - current));
		printArray(quickSortArray);
		return array;
	}
	
	private void reQuickSort(int left,int right) {
		if (right - left <=0) {
			return;
		}
		int pivot = quickSortArray[right];		
		int partion = partitionIt(left, right, pivot);
		
		reQuickSort(left,partion-1);
		reQuickSort(partion+1, right);
	}
	
	private int partitionIt(int left,int right,int pivot) {
		int leftPtr = left -1;
		int rightPtr = right +1;
		while (true) {
			while (quickSortArray[++leftPtr] < pivot) {				
			}
			
			while (quickSortArray[--rightPtr] > pivot) {				
			}
			
			if (leftPtr >= rightPtr) {
				break;
			}else {
				int temp = quickSortArray[leftPtr];
				quickSortArray[leftPtr] = quickSortArray[rightPtr];
				quickSortArray[rightPtr] = temp;
			}
		}
		return leftPtr;		
	}

	/**
	 * 希尔排序
	 */
	private int[] shellSort(int[] array) {
		long current = System.currentTimeMillis();
		int h = 1;
		while (h <= array.length / 3) {
			h = h * 3 + 1;
		}

		while (h > 0) {
			for (int out = h; out < array.length; out++) {
				int temp = array[out];
				int in = out;
				while (in > h - 1 && array[in - h] >= temp) {
					array[in] = array[in - h];
					in = in - h;
				}
				array[in] = temp;

			}
			h = (h - 1) / 3;
		}

		System.out.println("shellSort:"
				+ (System.currentTimeMillis() - current));
		printArray(array);
		return array;
	}

	private int[] createRadomIntegerArray(int size) {
		Set<Integer> set = new HashSet<Integer>();
		while (true) {
			int value = getRadomInt(1000000);
			if (!set.contains(value)) {
				set.add(value);
			}
			if (set.size() > size - 1) {
				break;
			}

		}
		Integer[] intArray = new Integer[set.size()];
		set.toArray(intArray);
		int[] array = new int[set.size()];
		for (int i = 0; i < set.size(); i++) {
			array[i] = intArray[i];
		}
		printArray(array);
		return array;

	}

	private int getRadomInt(int size) {
		int value = (int) Math.floor(size * (Math.random()));
		return value;
	}

	private void printArray(int[] array) {
		if (1==1) {
			return;
		}
		System.out.println("============================");
		if (array != null) {
			System.out.print("[");
			for (int value : array) {
				System.out.print(value);
				System.out.print(",");
			}
			System.out.println("]");

		}
		System.out.println("============================");

	}

	private int[] cloneArray(int[] array) {
		int[] cloneArray = new int[array.length];
		for (int i = 0; i < array.length; i++) {
			cloneArray[i] = array[i];
		}
		return cloneArray;
	}

}
