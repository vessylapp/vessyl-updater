const { spawn } = require('child_process');

async function stopContainers() {
    console.log('Starting stopContainers...');
    return new Promise((resolve, reject) => {
        const child = spawn('docker', ['stop', 'vw', 'vui', 'vp']);

        child.stdout.on('data', (data) => {
            console.log(`${data}`);
        });

        child.stderr.on('data', (data) => {
            console.error(`${data}`);
        });

        child.on('error', (error) => {
            console.error(error);
        });

        child.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            resolve();
        });
    });
}

async function removeContainers() {
    console.log('Starting removeContainers...');
    return new Promise((resolve, reject) => {
        const child = spawn('docker', ['rm', 'vw', 'vui', 'vp']);

        child.stdout.on('data', (data) => {
            console.log(`${data}`);
        });

        child.stderr.on('data', (data) => {
            console.error(`${data}`);
        });

        child.on('error', (error) => {
            console.error(error);
        });

        child.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            resolve();
        });
    });
}

async function pullProxy() {
    console.log('Starting pullProxy...');
    return new Promise((resolve, reject) => {
        const child = spawn('docker', ['pull', 'ghcr.io/vessylapp/vessyl-proxy:latest']);

        child.stdout.on('data', (data) => {
            console.log(`${data}`);
        });

        child.stderr.on('data', (data) => {
            console.error(`${data}`);
        });

        child.on('error', (error) => {
            console.error(error);
        });

        child.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            resolve();
        });
    });
}

async function pullWorker() {
    console.log('Starting pullWorker...');
    return new Promise((resolve, reject) => {
        const child = spawn('docker', ['pull', 'ghcr.io/vessylapp/vessyl-worker:latest']);

        child.stdout.on('data', (data) => {
            console.log(`${data}`);
        });

        child.stderr.on('data', (data) => {
            console.error(`${data}`);
        });

        child.on('error', (error) => {
            console.error(error);
        });

        child.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            resolve();
        });
    });
}

async function pullUI() {
    console.log('Starting pullUI...');
    return new Promise((resolve, reject) => {
        const child = spawn('docker', ['pull', 'ghcr.io/vessylapp/vessyl-ui:latest']);

        child.stdout.on('data', (data) => {
            console.log(`${data}`);
        });

        child.stderr.on('data', (data) => {
            console.error(`${data}`);
        });

        child.on('error', (error) => {
            console.error(error);
        });

        child.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            resolve();
        });
    });
}

async function runWorker() {
    console.log('Starting runWorker...');
    return new Promise((resolve, reject) => {
        const child = spawn('docker', ['run', '--network', 'vessyl-bridge', '--name', 'vw', '-d', '-e', 'MONGO_URI=mongodb://vdb:27017/', '-v', '/var/run/docker.sock:/var/run/docker.sock', '--restart', 'always', 'ghcr.io/vessylapp/vessyl-worker:latest']);

        child.stdout.on('data', (data) => {
            console.log(`${data}`);
        });

        child.stderr.on('data', (data) => {
            console.error(`${data}`);
        });

        child.on('error', (error) => {
            console.error(error);
        });

        child.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            resolve();
        });
    });
}

async function runProxy() {
    console.log('Starting runProxy...');
    return new Promise((resolve, reject) => {
        const child = spawn('docker', ['run', '--network', 'vessyl-bridge', '--name', 'vp', '-v', 'proxy_data:/etc/caddy', '-d', '-p', '80:80', '-p', '443:443', '--restart', 'always', 'ghcr.io/vessylapp/vessyl-proxy:latest']);
        child.stdout.on('data', (data) => {
            console.log(`${data}`);
        });

        child.stderr.on('data', (data) => {
            console.error(`${data}`);
        });

        child.on('error', (error) => {
            console.error(error);
        });

        child.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            resolve();
        });
    });
}

async function runUI() {
    console.log('Starting runUI...');
    return new Promise((resolve, reject) => {
        const child = spawn('docker', ['run', '--network', 'vessyl-bridge', '--name', 'vui', '-d', '--restart', 'always', '-p', '3000:3000', 'ghcr.io/vessylapp/vessyl-ui:latest']);

        child.stdout.on('data', (data) => {
            console.log(`${data}`);
        });

        child.stderr.on('data', (data) => {
            console.error(`${data}`);
        });

        child.on('error', (error) => {
            console.error(error);
        });

        child.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            resolve();
        });
    });
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    console.log('Starting main...');
    await stopContainers();
    await delay(1000);
    await removeContainers();
    await delay(1000);
    await pullProxy()
    await delay(1000);
    await pullWorker();
    await delay(1000);
    await pullUI();
    await delay(1000);
    await runProxy();
    await delay(1000);
    await runWorker();
    await delay(1000);
    await runUI();
}

main();