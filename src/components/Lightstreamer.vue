<script setup>
import { LightstreamerClient, Subscription } from 'lightstreamer-client-web';
import { ref } from 'vue'

var client = new LightstreamerClient("https://push.lightstreamer.com/", "ISSLIVE");
client.connect();

var sub = new Subscription("MERGE", ["NODE3000005"], ["TimeStamp","Value"]);
var timesub = new Subscription("MERGE", "TIME_000001", ["TimeStamp", "Status.Class"]);

client.subscribe(sub);
client.subscribe(timesub);

function hoursToDate(hours) {
    // Create base date of current year
    const currentYear = new Date().getFullYear();
    const baseDate = new Date(Date.UTC(currentYear, 0, 0));
    
    // Convert hours to milliseconds (hours * minutes * seconds * milliseconds)
    const milliseconds = hours * 60 * 60 * 1000;
    
    // Add milliseconds to base date
    const resultDate = new Date(baseDate.getTime() + milliseconds);
    
    return resultDate;
}

//Get user timezone
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const timeFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'medium', timeZone: timezone });

//Define state
var date = ref();
var percentage = ref();

sub.addListener({
    onItemUpdate: function(update) {
        let value = update.getValue("Value");
        let hours = update.getValue("TimeStamp");

        percentage.value = value;
        date.value = timeFormatter.format(hoursToDate(hours));
        console.log(date);  // Formats date in proper timezone
        console.log(value);
    }
});
</script>

<template>
    <div class="wrapper">
        <div class="text-container">
            <div class="date">The urine tank on the International Space Station 🚀 is filled to:</div>
            <div class="percentage">{{ percentage }}%</div>
            <div class="date">It was last used:</div>
            <div class="date">{{ date }}</div>
        </div>
        <div 
            class="fill-box"
            :style="{
                '--fill-percentage': `${percentage}`
            }"
        ></div>
    </div>
</template>
  
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

.text-container {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 20px;
}

.percentage {
    font-size: 52px;
    margin-bottom: 10px;
}

.date {
    font-size: 24px;
}

.fill-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    background-color: yellow;
    height: calc(var(--fill-percentage) * 1vh);
    transition: height 0.3s ease-out;
}
</style>