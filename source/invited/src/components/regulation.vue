<template>
  <div class="regulation">
    <div class="header">邀请用户协议</div>
    <div
      class="content"
    >点击邀请好友即默认为您已阅读并同意《邀请注册协议》。为保障您的合法权益，请在参与邀请注册活动之前，仔细阅读本协议。当您邀请好友注册时，默认您已知悉如下条款：</div>
    <div>
      <ol>
        <li class="listTitle"><em>1.</em> 活动简介</li>
        <div class="listBody">
         活动期间，分享优惠链接至您的好友，您的好友首次注册即送
          <span class="g_highlight">
            <span class="g_blod">20</span>元优惠券
          </span>，缴纳押金并购买套餐后，再获得 
          <span class="g_highlight">
            <span class="g_blod">5</span>天免费换电
          </span>。
          <div class="g_register">
            当好友首次注册，并缴纳押金购买任意e换电套餐，即判定邀请成功，邀请人可获得
            <span class="g_highlight">
              <span class="g_blod">3</span>天免费换电
            </span>（可叠加获取）
            <span class="g_highlight">
              最高可获一年免费换电。
            </span>
            在活动期间还有机会成为e换电至尊VIP，
            <span class="g_highlight">
              邀请好友第一名，终身享有6折优惠，前2、3名，终身享有7折优惠，前4、5、6名，终身享有8折优惠。
            </span>
          </div>
        </div>

        <li class="listTitle"><em>2.</em> 参与方式</li>
        <div class="listBody">用户通过e换电提供的分享路径邀请好友注册，被邀请人在邀请链接中输入手机号注册成功，即成功完成一次邀请。</div>

        <li class="listTitle"><em>3.</em> 活动说明</li>
        <ul>
          <li class="listBody">1、邀请人邀请次数无上限， 
            <span class="g_highlight">
              最多可获取一年免费换电。
            </span>
          </li>
          <li class="listBody">2、被邀请人
            <span class="g_highlight">
              从未使用过e换电服务，且首次注册，即送20元无门槛优惠券（优惠券15天内有效），购买任意套餐后，再送5天免费换电
            </span>
            （系统三个工作日内发放）
            <span class="g_highlight">
              。每个用户仅可被邀请一次。
            </span>
          </li>
          <li class="listBody">3、
            <span class="g_highlight">
              被邀请人购买套餐后，邀请人获得3天免费换电
            </span>
            （即刻发放）。
          </li>
          <li class="listBody">4、邀请关系以被邀请人首次注册手机号为准，邀请关系不可转移与解除。</li>
          <li class="listBody">5、赠送免费换电天数在已有套餐结束后自动生效。</li>
          <li class="listBody">6、系统自动排出邀请好友成功最多者，
            <span class="g_highlight">
              并在活动结束后自动升级为至尊VIP。享受不同折扣，用户可点击活动页面查看排名。
            </span>
          </li>
          <li class="listBody">7、用户获赠的任何奖品，不可退换，不折现，不设找零。</li>
        </ul>

        <li class="listTitle"><em>4.</em> 特别声明</li>
        <div class="listBody">我们包含邀请注册在内的所有优惠推广活动仅向正当、合法使用我们e换电服务及车辆的用户。
          每位参与者（含邀请人及被邀请人）的帐号、手机号及其他身份认证信息必须是唯一的，任何信息与其他用户重合都不能参加该活动。
          活动中，一旦发现您存在利用我们的规则漏洞进行任何形式的作弊行为（包括但不限于通过我们的活动获得不正当的经济利益），我们有权取消与作弊行为相关账户的奖励、追回您作弊所得的不正当经济利益、关闭作弊账户或与您相关的所有账户，并保留取消您后续使用我们e换电服务及车辆的权利，必要时会依据严重程度追究您的法律责任。
          活动的最终解释权归易马达公司所有。
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
ul {
  padding: 0 0 0 30px;
}
/* ul .listBody{
    list-style-type:circle;
} */
</style>
