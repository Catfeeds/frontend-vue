<template>
  <div class="regulation">
    <div class="header">邀请用户协议</div>
    <div class="content">点击邀请好友即默认为您已阅读并同意《邀请注册协议》。为保障您的合法权益，请在参与邀请注册活动之前，仔细阅读本协议。当您邀请好友注册时，默认您已知悉如下条款：</div>
    <div>
      <ol>
        <li class="listTitle"><em>1.</em> 活动简介</li>
        <div class="listBody">
         活动期内，邀请好友加入e换电服务，缴纳押金并首次付费购买任意换电套餐后，邀请人即可获得
          <span class="g_highlight">
            <span class="g_blod">7天</span>免费换电天数
          </span>，被邀请人可获得
          <span class="g_highlight">
            <span class="g_blod">50</span>元换电套餐优惠券
          </span>。邀请的好友数量越多，获得的奖励越多。
        </div>

        <li class="listTitle"><em>2.</em> 参与方式</li>
        <div class="listBody">用户通过e换电提供的分享路径邀请好友注册，被邀请人在邀请链接中输入手机号注册成功，即成功完成一次邀请。</div>

        <li class="listTitle"><em>3.</em> 活动说明</li>
        <ul>
          <li class="listBody">1、每位用户的邀请次数无上限。</li>
          <li class="listBody">2、被邀请人需从未使用过e换电服务，每位用户最多可获得一次受邀奖励。</li>
          <li class="listBody">3、邀请关系以被邀请人第一次提交注册手机号信息为准，邀请关系不可转移和解除。</li>
          <li class="listBody">4、拥有相同账户、手机号及设备的用户视为同一用户，该规则适用于邀请者与被邀请者。</li>
          <li class="listBody">5、邀请人在APP【我的套餐】中查看获得的奖励天数。如有正在使用的套餐，等在使用套餐到期后，赠送的换电天数会自动生效。
            被邀请人可以在e换电App平台【我的钱包】中查看获得的奖励优惠券，优惠券有效期 <span class="g_highlight">90天</span>
            。奖励的优惠券使用规则：购买299包月套餐，可选择抵扣使用。
          </li>
          <li class="listBody">6、每个订单只能使用一张优惠券。优惠券一次性有效，不可兑换现金，不设找零。</li>
        </ul>

        <li class="listTitle"><em>5.</em> 特别声明</li>
        <div class="listBody">
          我们包含邀请注册在内的所有优惠推广活动仅向正当、合法使用我们e换电服务及车辆的用户。
          每位参与者（含邀请人及被邀请人）的帐号、手机号及其他身份认证信息必须是唯一的，任何信息与其他用户重合都不能参加该活动。
          活动中，一旦发现您存在利用我们的规则漏洞进行任何形式的作弊行为（包括但不限于通过我们的活动获得不正当的经济利益），我们有权取消与作弊行为相关账户的奖励、追回您作弊所得的不正当经济利益、关闭作弊账户或与您相关的所有账户，并保留取消您后续使用我们e换电服务及车辆的权利，必要时会依据严重程度追究您的法律责任。
        </div>
      </ol>
    </div>

    <div class="footer">
      活动客服热线:
      <span class="g_phone">0755-27787220</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "regulation",
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to _this component only -->
<style scoped>
.regulation{
    width: 750px;
}
.header {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  color: #000;
  line-height: 80px;
}
.content {
  padding: 32px;
  font-size: 26px;
  color: #333;
}
.listTitle {
  padding: 20px;
  font-size: 30px;
  font-weight: bold;
  color: #333;
}
.listTitle em{
    margin-left: -50px;
    margin-right: 30px;
}
.listBody {
  margin-right: 50px;
  font-size: 26px;
  color: #666;
}
.listBody .g_highlight {
  font-weight: bold;
  color: #ff6b00;
  font-size: 20px;
}
.listBody .g_highlight .g_blod {
  font-size: 30px!important;
}
.footer {
  padding: 20px 0 20px 0;
  text-align: center;
  color: #808080;
  font-size: 26px;
}
.footer .g_phone {
  font-size: 26px;
  font-weight: bold;
  color: #ff6b00;
}
ol {
  padding: 0 0 0 60px;
}
/* ul {
  padding: 0 0 0 30px;
} */
ul li{
  padding:5px 0;
}
/* ul .listBody{
    list-style-type:circle;
} */
</style>
