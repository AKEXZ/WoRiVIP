// hook_dateutil.js
// JS hook for Xposed/LSPosed / SimpleHookR / jshook

Java.perform(function () {
    try {
        var DateUtil = Java.use('com.yuwell.cgm.utils.DateUtil');
        var target = DateUtil.formatCustomPattern.overload('java.lang.String', 'java.util.Date');

        target.implementation = function (pattern, date) {
            try {
                if (pattern === 'yyyy/MM/dd HH:mm' && date !== null) {
                    var Calendar = Java.use('java.util.Calendar');
                    var cal = Calendar.getInstance();
                    cal.setTime(date);
                    var year = cal.get(1); // Calendar.YEAR
                    if (year >= 2099) {
                        return '2099/01/01 00:00';
                    }
                }
            } catch (e) {
                try { XposedBridge.log('hook_dateutil inner error: ' + e); } catch (ee) {}
            }
            return target.call(this, pattern, date);
        };
    } catch (ex) {
        try { XposedBridge.log('hook_dateutil error: ' + ex); } catch (e) {}
    }
});
