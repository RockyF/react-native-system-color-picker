#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface SystemColorPicker : RCTEventEmitter <RCTBridgeModule, NSWindowDelegate>

@property int ID_INC;
@property NSColor *color;
@property NSDictionary *options;
@property RCTPromiseResolveBlock resolve;
@property NSNumber *cmdID;

@end
