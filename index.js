const os = require('os');

function realTimeSystemMonitor() {
    setInterval(() => {
        const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
        const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
        const uptime = (os.uptime() / 3600).toFixed(2);

        console.clear();
        console.log('=== SYSTEM MONITOR ===');
        console.log(`Time: ${new Date().toLocaleTimeString()}`);
        console.log(`Free Memory: ${freeMem} GB / ${totalMem} GB`);
        console.log(`Uptime: ${uptime} hours`);

        const loadAvg = os.loadavg();
        if (loadAvg) {
            console.log(`Load Average: ${loadAvg.map(l => l.toFixed(2)).join(', ')}`);
        }
    }, 2000);
}

realTimeSystemMonitor(); 