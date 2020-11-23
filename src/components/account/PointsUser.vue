<template>
  <div class="pointsUser account-view">
    <p class="pointsName">Баллы</p>
    <hr class="">
    <p class="pointsQan">322 балла</p>
    <div class="pointsOperation"><ul>
      <li><span class="pointsDate">14.10.14</span><span class="pointsDelta">+10 баллов</span><hr></li>
      <li><span class="pointsDate">14.10.14</span><span class="pointsDelta">+10 баллов</span><hr></li>
      <li><span class="pointsDate">14.10.14</span><span class="pointsDelta">+10 баллов</span><hr></li>
      <li><span class="pointsDate">14.10.14</span><span class="pointsDelta">+10 баллов</span><hr></li>
      <li><span class="pointsDate">14.10.14</span><span class="pointsDelta">+10 баллов</span><hr></li>
      <li><span class="pointsDate">14.10.14</span><span class="pointsDelta">+10 баллов</span><hr></li>
    </ul></div>
    <button class="showAllPoints">Показать полностью</button>
  </div>

</template>

<script>
export default {
name:"PointsUser",
}
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
  background-color: #fff;
}
li {
    list-style-type: none;
   }
.showAllPoints{
  margin-left: 40px;
   }
.pointsQan{
font-family: Montserrat;
font-style: normal;
font-weight: bold;
font-size: 48px;
line-height: 59px;
padding-left: 40px;
}
.pointsName{
font-family: Montserrat;
font-style: normal;
font-weight: normal;
font-size: 24px;
line-height: 29px;
padding-left: 40px;
}
.pointsOperation{
  display: flex;
}
.pointsDate, .pointsDelta{
font-family: Montserrat;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 22px;
}
.pointsDelta{
  float: right;
  padding-left: 70px;
}
</style>