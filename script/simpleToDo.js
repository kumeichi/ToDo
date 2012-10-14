var ws = window.localStorage;
var storageCnt = 0;

/**
 * LocalStorageにデータを登録する
 * @param {Object} id keyとなる文字列
 * @param {Object} value TODOリストのタスク文字列
 * @param {Object} checked チェック状態
 */
var setStorage = function(id, value, checked) {
    var item = {
        "value" : value,
        "checked" : checked
    }
    ws.setItem(id, JSON.stringify(item));
};
/**
 * ToDoリストを画面上のDOMにセットする
 * @param {Object} id DOMのID, localstorage上のkeyに相当
 * @param {Object} value ToDoリストのタスクの文字列
 * @param {Object} checked チェック状態
 */
var setToDo = function(id, value, checked) {
    var $item = $('<li><input type="checkbox"><label></label></li>');
    $item.find(':input').attr({
        'id' : id,
        'checked' : checked
    });
    if (checked) {
        $item.find("label").css({
            'text-decoration' : 'line-through'
        });
    }
    $item.find('label').attr('for', id).text(value);
    $item.prependTo('#taskContainer');
    $("#taskContainer").show();
};
// ドキュメント読み込み完了時の処理
$(function() {
    // 登録されているデータがある場合には取り出す
    if (ws.length) {
        for (var i = 0; ws.length > i; i++) {
            var item = JSON.parse(ws.getItem(i));
            setToDo(storageCnt, item.value, item.checked);
            storageCnt++;
        }
    } else {
        $("#taskContainer").hide();
    }

    // 登録ボタンを押した際の挙動
    $('#insertTask').on('click', function() {
        if ($(this).prev().val()) {
            var value = $(this).prev().val();
            // データの登録
            setStorage(storageCnt, value, false);
            // 画面上の処理
            setToDo(storageCnt, value, false);
            $(this).prev().val('').focus();

            // すべての処理が終わってからカウンタをインクリメント
            storageCnt++;
        }
    });
    // チェックボックスを押した場合の挙動
    $(':checkbox').on('change', function() {
        // チェック状態を登録
        setStorage($(this).attr("id"), $(this).next().text(), $(this).prop("checked"));
        // 画面上の処理
        if ($(this).prop('checked')) {
            $(this).next().addClass("checked")
        } else {
            $(this).next().removeClass("checked");
        }
    });
});
