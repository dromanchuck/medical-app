package com.medical-app;

import com.facebook.react.ReactActivity;
import android.os.Bundle;

import com.facebook.react.ReactActivityDelegate; 
import com.zoontek.rnbootsplash.RNBootSplash; 

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "medical-app";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null); 
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {

      @Override
      protected void loadApp(String appKey) {
        RNBootSplash.init(MainActivity.this); // <- initialize the splash screen
        super.loadApp(appKey);
      }
    };
  }

}
