package com.sobetec.sobescore;

public class Sobescore {

	public static void main(String[] args) {
		Double a = 56.90020302862004;
		Double b = 30.06551590366119;
		Double c = 5.919497539989776;
		Double d = 47.54017840669978;
		//Double f = 0.0;
		//Double x = 45.00;
		
		
		Double z = 4.139;
		Double reverseUp;
		
		for(int i = 1; i < 101; i++) {
			Double y = (a *( i - b ) / (c + Math.abs(i-b) )) +d;
			//result = Math.round(result*100.0) / 100.0;
			//System.out.println("result = "+y.toString() );
			if (y > 50) {
				reverseUp = (((y-50)*(z-50))+(50*(50+z))) / (100 + z - y);
			}else if(y < 50){
				//System.out.println("running less than");
				reverseUp = ((50+z)/(y+z))*y;
			}else {
				reverseUp = 50.0;
			}
			System.out.println("x== "+ i +" y= "+y +"  reverseUp= "+reverseUp.toString() );
		}
		
		
		
		
	}

}
