namespace MuseIoT {
	let flag = true;
	
	// -------------- 1. Initialization ----------------
    //%blockId=muselab_initialize_wifi
    //%block="Initialize WiFi IoT Shield"
	//% weight=90
    export function initializeWifi(): void {
        serial.redirect(SerialPin.P16,SerialPin.P8,BaudRate.BaudRate9600);
    }
	
	// -------------- 2. WiFi ----------------
    //% blockId=muselab_set_wifi
	//% block="Set wifi to ssid %ssid| pwd |%pwd"   
	//% weight=80	
    export function setWifi(ssid: string, pwd: string): void {
        serial.writeLine("(AT+wifi?ssid="+ssid+"&pwd="+pwd+")"); 
    }
	
	//% blockId=muselab_set_wifi_hotspot
	//% block="Set hotspot to ssid %ssid| pwd |%pwd"   
	//% weight=75	
    export function setWifiHotspot(ssid: string, pwd: string): void {
        serial.writeLine("(AT+wifi_hotspot?ssid="+ssid+"&pwd="+pwd+")"); 
    }
	
    //% blockId=muselab_set_thingspeak
	//% block="Send ThingSpeak key %key| field1 %field1| field2 |%field2"
	//% weight=70	
    export function sendThingspeak(key: string, field1: number, field2: number): void {
        serial.writeLine("(AT+thingspeak?key=" + key+"&field1="+field1+"&field2="+field2+")"); 
    }
	
    //% blockId=muselab_set_ifttt
	//% block="Send IFTTT key %key| event_name %event| value1 %value1| value2 %value2|"
	//% weight=60	
    export function sendIFTTT(key: string, eventname: string, value1: number, value2: number): void {
        serial.writeLine("(AT+ifttt?key=" + key+"&event="+eventname+"&value1="+value1+"&value2="+value2+")"); 
    }
	
    //%blockId=muselab_start_server
    //%block="Start web listening"
	//% weight=55	
    export function startWebServer(): void {
		flag = true
		serial.writeLine("(AT+startWebServer)")
		while(flag) {
			serial.writeLine("(AT+write_sensor_data?p0=" + pins.analogReadPin(AnalogPin.P0) + "&p1=" + pins.analogReadPin(AnalogPin.P1) + "&p2=" + pins.analogReadPin(AnalogPin.P2) + ")")
			basic.pause(500)
			if(!flag)
				break;
		}
		
    }
	
	// -------------- 3. Others ----------------

	//%subcategory=More
    //%blockId=muselab_180servo
    //% block="Control 180° servo pin %pin| degree |%degree"
	//% weight=50	
    export function control180Servo(pin: number, degree: number): void {
        serial.writeLine("(AT+servo_180?pin="+pin+"&degree="+degree+")");
    }	

	//%subcategory=More
    //%blockId=muselab_360servo
    //% block="Control 360° servo pin %pin| direction %direction| speed |%speed"
	//% weight=45	
    export function control360Servo(pin: number, direction: string, speed: number): void {
        serial.writeLine("(AT+servo_360?pin="+pin+"&direction="+direction+"&speed="+speed+")");
    }

	//%subcategory=More
    //%blockId=muselab_battery
    //%block="Get battery level"
	//% weight=40	
    export function sendBattery(): void {
        serial.writeLine("(AT+battery)");
    }	
	
		
	//%subcategory=More
    //%blockId=muselab_version
    //%block="Get firmware version"
	//% weight=39	
    export function sendVersion(): void {
        serial.writeLine("(AT+version)");
    }
	
	// -------------- 4. General ----------------
	//%subcategory=More
    //%blockId=muselab_at
    //%block="Send AT command |%command"
	//% weight=30	
    export function sendAT(command: string): void {
        serial.writeLine(command);
		flag = false
    }
	
	//%subcategory=More
    //%blockId=muselab_test
    //%block="Send AT test"
	//% weight=20	
    export function sendTest(): void {
        serial.writeLine("(AT+testing)");
    }
	
	//%subcategory=More
    //%blockId=muselab_deep_sleep
    //%block="Set deep sleep %second| second"
	//% weight=15	
    export function setDeepSleep(second: number): void {
        serial.writeLine("(AT+deepsleep?time="+second+")");
    }	
		
	
}