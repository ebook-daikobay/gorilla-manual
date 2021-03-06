# ブロックサイズ

ブロックサイズは`8,16,32,64`の4つから選びます。ブロックサイズは大きいほどデコード速度は向上しますが、主観画質が低下します。

| 8 | 16 | 32 | 64 |
|:-:|:--:|:--:|:--:|
| <span style="color:green;">高画質</span> | やや高画質 | やや低画質 | <span style="color:red;">低画質</span> |
|<span style="color:red;">高負荷</span> | やや高負荷 | やや低負荷 | <span style="color:green;">低負荷</span> |

> あくまでブロックサイズを変更した場合の比較で低画質でも綺麗な動画になります

## ブロックサイズの選び方

ブロックサイズの値は低いほど画質が向上しますが、比例してデコード処理の負荷が高まるため、低性能のデバイスでは再生時に動画がカクついてしまう場合があります。

例えばiPhoneとAndroid端末だと、iPhoneは8ブロックでも安定しますがAndroidは32ブロック以上で安定します。こういった場合はiPhoneとAndroidで使うH2MDリソースを分けるべきです。サンプルコードを[デバイスによって使うH2MDリソースを分ける方法](../example/device_play.md)で紹介してますのでご参照ください。
