(function () {
    'use strict';
    Lampa.Platform.tv();

function start() {

    let start_time = 0

    function closeApp() {
       Lampa.Activity.out();
          if (Lampa.Platform.is('apple_tv')) window.location.assign('exit://exit');
          if (Lampa.Platform.is("tizen")) tizen.application.getCurrentApplication().exit();
          if (Lampa.Platform.is("webos")) window.close();
          if (Lampa.Platform.is("android")) Lampa.Android.exit();
          if (Lampa.Platform.is("orsay")) Lampa.Orsay.exit();
          if (Lampa.Platform.is("nw")) nw.Window.get().close();
          if (Lampa.Platform.is('netcast')) window.NetCastBack();
          if (Lampa.Platform.is('browser')) window.close();
    }

    Lampa.Activity.listener.follow('backward',(event)=>{
        if (!start_time) start_time = Date.now()
        if (event.count == 1 && Date.now() < start_time + (1000 * 2)){
            let enabled = Lampa.Controller.enabled()

            Lampa.Select.show({
                title: Lampa.Lang.translate('title_out'),
                items: [
                    {
                        title: Lampa.Lang.translate('title_out_confirm')
                    },
//                    {
//                        title: Lampa.Lang.translate('title_reset')
//                    },
                    {
                        title: Lampa.Lang.translate('cancel')
                    }
                ],
                onSelect: (a)=>{
                    if (a.title == Lampa.Lang.translate('title_out_confirm')){
                        Lampa.Activity.out()
                        Lampa.Controller.toggle(enabled.name)
                        closeApp()
//                    } else if (a.title == Lampa.Lang.translate('title_reset')){
//                        location.reload()
//                    } else if (a.title == Lampa.Lang.translate('cancel')){
//                        Lampa.Controller.toggle(enabled.name)
                    } else {
                        Lampa.Controller.toggle(enabled.name)
                    }
                },
                onBack: ()=>{
                    Lampa.Controller.toggle(enabled.name)
                }
            })
        }
    })
} 
  
if (window.appready) start();
else Lampa.Listener.follow('app', function(e) {	if (e.type == 'ready') start(); });

})();