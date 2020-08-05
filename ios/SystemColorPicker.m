#import "SystemColorPicker.h"
#import <React/RCTUtils.h>

@implementation SystemColorPicker

RCT_EXPORT_MODULE()

- (NSArray<NSString *> *)supportedEvents {
  return @[@"colorChange"];
}

RCT_REMAP_METHOD(open,
  openWithColor:(nullable NSColor *) color
  withOptions:(nullable NSDictionary *) options
  withResolver:(RCTPromiseResolveBlock)resolve
  withRejecter:(RCTPromiseRejectBlock)reject)
{
  _color = color;
  _options = options;
  _resolve = resolve;
  [self performSelectorOnMainThread:@selector(showColorPicker) withObject:nil waitUntilDone:NO];
}

- (void)showColorPicker {
  NSNumber *cmdID = @(++_ID_INC);
  _cmdID = cmdID;

  NSColorPanel *colorPanel = [NSColorPanel sharedColorPanel];
  [colorPanel setTarget:self];
  [colorPanel setAction:@selector(gotColor:)];
  if(_color != nil){
    colorPanel.color = _color;
  }
  if (_options != nil) {
    if(_options[@"showsAlpha"] != nil) {
      colorPanel.showsAlpha = (BOOL) _options[@"showsAlpha"];
    }
  }else{
    colorPanel.showsAlpha = NO;
  }
  [colorPanel orderFront:nil];

  _resolve(cmdID);
}

- (void)gotColor:(NSColorPanel *)sender {

  [self sendEventWithName:@"colorChange" body:@{@"cmdID": _cmdID, @"color": RCTColorToHexString(sender.color.CGColor)}];
}

@end
