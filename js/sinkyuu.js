$('#page-link a[href*="#"]').click(function () {//全てのページ内リンクに適用させたい場合はa[href*="#"]のみでもOK
    var elmHash = $(this).attr('href'); //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
    var pos = $(elmHash).offset().top;	//idの上部の距離を取得
    $('body,html').animate({ scrollTop: pos }, 700); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
    return false;
});
function fadeAnime() {

    // ふわっ
    $('.fadeUpTrigger').each(function () { //fadeUpTriggerというクラス名が
        var elemPos = $(this).offset().top - 0;//要素より、50px上の
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll >= elemPos - windowHeight) {
            $(this).addClass('fadeUp');// 画面内に入ったらfadeUpというクラス名を追記
        } else {
            // $(this).removeClass('fadeUp');// 画面外に出たらfadeUpというクラス名を外す
        }
    });
}
// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
    fadeAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
    fadeAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述


// 動きのきっかけの起点となるアニメーションの名前を定義
function moveAnimation() {
    //スクロールしたらランダムに出現
    var randomElm2 = $(".images__list");//親要素取得
    var randomElm2Child = $(randomElm2).children();	//親の子要素を取得
    randomScrollAnime();
    function randomScrollAnime() {
        var elemPos = $(".exterior__img").offset().top - 50;//要素より、50px上まで来たら
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll >= elemPos - windowHeight) {
            if (randomElm2Child.length > 0) { //配列数以上であれば処理をおこなう
                var rnd = Math.floor(Math.random() * randomElm2Child.length);//配列数から表示する数値をランダムで取得
                var moveData = "fadeUp";//アニメーション名＝CSSのクラス名を指定
                if (animeFlag) {//スクロールする度に動作するのでアニメーションが終わるまで処理をさせないようにする
                    animeFlag = false;//アニメーション処理が終わるまで一時的にfalseにする
                    $(randomElm2Child[rnd]).addClass(moveData);//アニメーションのクラスを追加
                    setTimeout(function () {
                        animeFlag = true;//次の処理をおこなうためにtrueに変更
                        randomScrollAnime();//自身の処理を繰り返す
                    }, 450);	//0.5秒間隔で。※ランダムのスピード調整はこの数字を変更させる
                    randomElm2Child.splice(rnd, 1);//アニメーション追加となった要素を配列から削除
                }
            }

        } else {
            animeFlag = true;
        }

    }
}

var animeFlag = true;//スクロールする度に動作するのでアニメーションが終わるまで処理をさせないようにするための定義

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
    moveAnimation();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
// $(window).on('load', function () {
//     moveAnimation();/* アニメーション用の関数を呼ぶ*/
// });// ここまで画面が読み込まれたらすぐに動かしたい場合の記述

$('.button__img').click(function () {
    $('body,html').animate({
        scrollTop: 0//ページトップまでスクロール
    }, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
    return false;//リンク自体の無効化
});


function setFadeElement() {
    var windowH = $(window).height();	//ウィンドウの高さを取得
    var scroll = $(window).scrollTop(); //スクロール値を取得

    //出現範囲の指定
    var contentsTop = Math.round($('#area-2').offset().top);	//要素までの高さを四捨五入した値で取得
    var contentsH = $('body').outerHeight(true);	//要素の高さを取得

    //2つ目の出現範囲の指定※任意
    //var contentsTop2 = Math.round($('#area-5').offset().top);	//要素までの高さを取得
    //var contentsH2 = $('#area-5').outerHeight(true);//要素の高さを取得

    //出現範囲内に入ったかどうかをチェック
    if (scroll + windowH >= contentsTop && scroll + windowH <= contentsTop + contentsH) {
        $(".button").addClass("UpMove"); //入っていたらUpMoveをクラス追加
        $(".button").removeClass("DownMove"); //DownMoveを削除
        $(".hide-btn").removeClass("hide-btn"); //hide-btnを削除
    }//2つ目の出現範囲に入ったかどうかをチェック※任意
    // else if(scroll+windowH >= contentsTop2 && scroll+windowH <= contentsTop2+contentsH2){
    //$("#page-top").addClass("UpMove");    //入っていたらUpMoveをクラス追加
    //$("#page-top").removeClass("DownMove");   //DownMoveを削除
    //}//それ以外は
    else {
        if (!$(".hide-btn").length) {				//サイト表示時にDownMoveクラスを一瞬付与させないためのクラス付け。hide-btnがなければ下記の動作を行う
            $(".button").addClass("DownMove");  //DownMoveをクラス追加
            $(".button").removeClass("UpMove"); //UpMoveを削除
        }
    }
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
    setFadeElement();/* スクロールした際の動きの関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
    setFadeElement();/* スクロールした際の動きの関数を呼ぶ*/
});

//logoの表示
$(window).on('load', function () {
    $(".splash").delay(1500).fadeOut('slow');//ローディング画面を1.5秒（1500ms）待機してからフェードアウト
    $(".splash_logo").delay(1200).fadeOut('slow');//ロゴを1.2秒（1200ms）待機してからフェードアウト
});

$('.sliders').slick({
    fade: true,//切り替えをフェードで行う。初期値はfalse。
    autoplay: true,//自動的に動き出すか。初期値はfalse。
    autoplaySpeed: 3000,//次のスライドに切り替わる待ち時間
    speed: 1500,//スライドの動きのスピード。初期値は300。
    infinite: true,//スライドをループさせるかどうか。初期値はtrue。
    slidesToShow: 1,//スライドを画面に3枚見せる
    slidesToScroll: 1,//1回のスクロールで3枚の写真を移動して見せる
    arrows: true,//左右の矢印あり
    prevArrow: '<div class="slick-prev"></div>',//矢印部分PreviewのHTMLを変更
    nextArrow: '<div class="slick-next"></div>',//矢印部分NextのHTMLを変更
    dots: true,//下部ドットナビゲーションの表示
    pauseOnFocus: false,//フォーカスで一時停止を無効
    pauseOnHover: false,//マウスホバーで一時停止を無効
    pauseOnDotsHover: false,//ドットナビゲーションをマウスホバーで一時停止を無効
});

//スマホ用：スライダーをタッチしても止めずにスライドをさせたい場合
$('.sliders').on('touchmove', function (event, slick, currentSlide, nextSlide) {
    $('.sliders').slick('slickPlay');
});