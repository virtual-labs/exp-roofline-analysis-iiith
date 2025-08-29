// Roofline Performance Model Simulator
class RooflineSimulator {
    constructor() {
        this.chart = null;
        this.memoryBandwidths = [];
        this.computeCapabilities = [];
        this.applicationPoints = [];
        this.chartConfig = this.createChartConfig();
        
        this.init();
    }
    
    init() {
        this.setupChart();
        this.setupEventListeners();
        this.loadDefaultConfiguration();
    }
    
    createChartConfig() {
        return {
            type: 'line',
            data: {
                datasets: []
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'nearest'
                },
                onClick: (event, elements) => {
                    this.handleChartClick(event);
                },
                scales: {
                    x: {
                        type: 'logarithmic',
                        position: 'bottom',
                        title: {
                            display: true,
                            text: 'Operational Intensity (FLOPS/Byte)',
                            font: { size: 14, weight: 'bold' }
                        },
                        min: 0.01,
                        max: 100,
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        },
                        ticks: {
                            callback: function(value) {
                                if (value < 1) {
                                    return `1/${Math.round(1/value)}`;
                                }
                                return value.toString();
                            }
                        }
                    },
                    y: {
                        type: 'logarithmic',
                        title: {
                            display: true,
                            text: 'Performance (GFLOPS)',
                            font: { size: 14, weight: 'bold' }
                        },
                        min: 0.1,
                        max: 100000,
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 15
                        }
                    },
                    tooltip: {
                        callbacks: {
                            title: function(context) {
                                return `OI: ${context[0].parsed.x.toFixed(3)} FLOPS/Byte`;
                            },
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y.toFixed(2)} GFLOPS`;
                            }
                        }
                    }
                }
            }
        };
    }
    
    setupChart() {
        const ctx = document.getElementById('roofline-chart').getContext('2d');
        this.chart = new Chart(ctx, this.chartConfig);
    }
    
    setupEventListeners() {
        // Architecture configuration buttons
        document.getElementById('load-apple-silicon').addEventListener('click', () => this.loadAppleSiliconConfig());
        document.getElementById('load-intel-xeon').addEventListener('click', () => this.loadIntelXeonConfig());
        document.getElementById('load-nvidia-gpu').addEventListener('click', () => this.loadNvidiaGPUConfig());
        document.getElementById('clear-all').addEventListener('click', () => this.clearAll());
        
        // Form submissions
        document.getElementById('add-bandwidth-form').addEventListener('submit', (e) => this.handleAddBandwidth(e));
        document.getElementById('add-compute-form').addEventListener('submit', (e) => this.handleAddCompute(e));
        document.getElementById('add-application-form').addEventListener('submit', (e) => this.handleAddApplication(e));
        
        // Chart range controls
        document.getElementById('update-range').addEventListener('click', () => this.updateChartRange());
    }
    
    handleChartClick(event) {
        const rect = this.chart.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const canvasPosition = Chart.helpers.getRelativePosition(event, this.chart);
        const dataX = this.chart.scales.x.getValueForPixel(canvasPosition.x);
        const dataY = this.chart.scales.y.getValueForPixel(canvasPosition.y);
        
        if (dataX > 0 && dataY > 0) {
            const appName = prompt('Enter application name:');
            if (appName) {
                this.addApplicationPoint(appName, dataX, dataY, this.getRandomColor());
            }
        }
    }
    
    addMemoryBandwidth(name, bandwidth, color) {
        if (!this.validateBandwidth(bandwidth)) {
            this.showNotification('Invalid bandwidth value. Please enter a value between 0.1 and 10000 GB/s.', 'danger');
            return false;
        }
        
        const lineData = this.generateBandwidthLine(bandwidth);
        const dataset = {
            label: `${name} (${bandwidth} GB/s)`,
            data: lineData,
            borderColor: color,
            backgroundColor: color + '20',
            borderDash: [5, 5],
            borderWidth: 2,
            fill: false,
            pointRadius: 0,
            tension: 0,
            type: 'line'
        };
        
        this.memoryBandwidths.push({ name, bandwidth, color, dataset });
        this.updateChart();
        this.updateBandwidthList();
        this.updateRidgeAnalysis();
        
        return true;
    }
    
    addComputeCapability(name, peakFlops, color) {
        if (!this.validateFlops(peakFlops)) {
            this.showNotification('Invalid compute value. Please enter a value between 0.1 and 1000000 GFLOPS.', 'danger');
            return false;
        }
        
        const lineData = this.generateComputeLine(peakFlops);
        const dataset = {
            label: `${name} (${this.formatFlops(peakFlops)})`,
            data: lineData,
            borderColor: color,
            backgroundColor: color + '20',
            borderWidth: 3,
            fill: false,
            pointRadius: 0,
            type: 'line'
        };
        
        this.computeCapabilities.push({ name, peakFlops, color, dataset });
        this.updateChart();
        this.updateComputeList();
        this.updateRidgeAnalysis();
        
        return true;
    }
    
    addApplicationPoint(name, oi, performance, color) {
        if (!this.validateOI(oi) || !this.validateFlops(performance)) {
            this.showNotification('Invalid application data. Please check operational intensity and performance values.', 'danger');
            return false;
        }
        
        const dataset = {
            label: name,
            data: [{ x: oi, y: performance }],
            backgroundColor: color,
            borderColor: color,
            pointRadius: 8,
            pointHoverRadius: 10,
            showLine: false,
            type: 'scatter'
        };
        
        this.applicationPoints.push({ name, oi, performance, color, dataset });
        this.updateChart();
        this.updateApplicationList();
        this.updateApplicationAnalysis();
        
        return true;
    }
    
    generateBandwidthLine(bandwidth) {
        const points = [];
        const minOI = 0.01;
        const maxOI = 100;
        
        for (let oi = minOI; oi <= maxOI; oi *= 1.2) {
            const performance = oi * bandwidth;
            if (performance >= 0.1 && performance <= 100000) {
                points.push({ x: oi, y: performance });
            }
        }
        
        return points;
    }
    
    generateComputeLine(peakFlops) {
        return [
            { x: 0.01, y: peakFlops },
            { x: 100, y: peakFlops }
        ];
    }
    
    updateChart() {
        const allDatasets = [
            ...this.memoryBandwidths.map(bw => bw.dataset),
            ...this.computeCapabilities.map(cc => cc.dataset),
            ...this.applicationPoints.map(ap => ap.dataset)
        ];
        
        this.chart.data.datasets = allDatasets;
        this.chart.update('none');
    }
    
    updateBandwidthList() {
        const container = document.getElementById('bandwidth-list');
        container.innerHTML = '';
        
        this.memoryBandwidths.forEach((bw, index) => {
            const item = document.createElement('div');
            item.className = 'field is-grouped';
            item.innerHTML = `
                <div class="control is-expanded">
                    <div class="tags has-addons">
                        <span class="tag" style="background-color: ${bw.color}; color: white;">${bw.name}</span>
                        <span class="tag is-light">${bw.bandwidth} GB/s</span>
                    </div>
                </div>
                <div class="control">
                    <button class="button is-small is-danger" onclick="simulator.removeBandwidth(${index})">
                        <span class="icon is-small"><i class="fas fa-times"></i></span>
                    </button>
                </div>
            `;
            container.appendChild(item);
        });
    }
    
    updateComputeList() {
        const container = document.getElementById('compute-list');
        container.innerHTML = '';
        
        this.computeCapabilities.forEach((cc, index) => {
            const item = document.createElement('div');
            item.className = 'field is-grouped';
            item.innerHTML = `
                <div class="control is-expanded">
                    <div class="tags has-addons">
                        <span class="tag" style="background-color: ${cc.color}; color: white;">${cc.name}</span>
                        <span class="tag is-light">${this.formatFlops(cc.peakFlops)}</span>
                    </div>
                </div>
                <div class="control">
                    <button class="button is-small is-danger" onclick="simulator.removeCompute(${index})">
                        <span class="icon is-small"><i class="fas fa-times"></i></span>
                    </button>
                </div>
            `;
            container.appendChild(item);
        });
    }
    
    updateApplicationList() {
        const container = document.getElementById('application-list');
        container.innerHTML = '';
        
        this.applicationPoints.forEach((ap, index) => {
            const item = document.createElement('div');
            item.className = 'field is-grouped';
            item.innerHTML = `
                <div class="control is-expanded">
                    <div class="tags has-addons">
                        <span class="tag" style="background-color: ${ap.color}; color: white;">${ap.name}</span>
                        <span class="tag is-light">OI: ${ap.oi.toFixed(2)}</span>
                        <span class="tag is-light">${ap.performance.toFixed(1)} GFLOPS</span>
                    </div>
                </div>
                <div class="control">
                    <button class="button is-small is-danger" onclick="simulator.removeApplication(${index})">
                        <span class="icon is-small"><i class="fas fa-times"></i></span>
                    </button>
                </div>
            `;
            container.appendChild(item);
        });
    }
    
    updateRidgeAnalysis() {
        const container = document.getElementById('ridge-analysis');
        
        if (this.memoryBandwidths.length === 0 || this.computeCapabilities.length === 0) {
            container.innerHTML = '<p class="help">Add memory bandwidth and compute capability lines to see ridge point analysis.</p>';
            return;
        }
        
        let analysis = '<div class="content">';
        
        this.computeCapabilities.forEach(cc => {
            this.memoryBandwidths.forEach(bw => {
                const ridgePoint = cc.peakFlops / bw.bandwidth;
                analysis += `<p><strong>${cc.name} + ${bw.name}:</strong> Ridge at ${ridgePoint.toFixed(3)} FLOPS/Byte</p>`;
            });
        });
        
        analysis += '</div>';
        container.innerHTML = analysis;
    }
    
    updateApplicationAnalysis() {
        const container = document.getElementById('application-analysis');
        
        if (this.applicationPoints.length === 0) {
            container.innerHTML = '<p class="help">Add application points to see bottleneck analysis.</p>';
            return;
        }
        
        let analysis = '<div class="content">';
        
        this.applicationPoints.forEach(ap => {
            const ridgePoints = [];
            this.computeCapabilities.forEach(cc => {
                this.memoryBandwidths.forEach(bw => {
                    ridgePoints.push(cc.peakFlops / bw.bandwidth);
                });
            });
            
            if (ridgePoints.length > 0) {
                const avgRidge = ridgePoints.reduce((a, b) => a + b, 0) / ridgePoints.length;
                const boundType = ap.oi < avgRidge ? 'Memory-bound' : 'Compute-bound';
                const color = ap.oi < avgRidge ? 'has-text-info' : 'has-text-success';
                
                analysis += `<p><strong class="${color}">${ap.name}:</strong> ${boundType} (OI: ${ap.oi.toFixed(2)})</p>`;
            }
        });
        
        analysis += '</div>';
        container.innerHTML = analysis;
    }
    
    // Configuration loaders
    loadAppleSiliconConfig() {
        this.clearAll();
        
        // Memory bandwidth specifications
        this.addMemoryBandwidth('M1 Unified Memory', 68.25, '#007AFF');
        this.addMemoryBandwidth('M1 Pro Memory', 200, '#5856D6');
        this.addMemoryBandwidth('M1 Max Memory', 400, '#AF52DE');
        
        // Compute capabilities
        this.addComputeCapability('M1 CPU (8-core)', 300, '#FF9500');
        this.addComputeCapability('M1 Pro CPU (10-core)', 400, '#FF6D00');
        this.addComputeCapability('M1 GPU (8-core)', 2600, '#30D158');
        this.addComputeCapability('M1 Max GPU (32-core)', 10400, '#00C957');
        
        // Sample applications
        this.addApplicationPoint('Metal Compute Kernel', 4.0, 8500, '#FF3B30');
        this.addApplicationPoint('Accelerate Framework', 8.0, 9200, '#FF9500');
        
        this.showNotification('Apple Silicon configuration loaded successfully!', 'info');
    }
    
    loadIntelXeonConfig() {
        this.clearAll();
        
        // Memory hierarchy
        this.addMemoryBandwidth('DDR4-3200', 51.2, '#0071C5');
        this.addMemoryBandwidth('DDR5-4800', 76.8, '#004C9C');
        this.addMemoryBandwidth('L3 Cache', 500, '#66B2FF');
        this.addMemoryBandwidth('L2 Cache', 1000, '#3399FF');
        
        // Compute capabilities
        this.addComputeCapability('Xeon Gold (Scalar)', 400, '#FFD700');
        this.addComputeCapability('Xeon Gold (AVX-512)', 3200, '#FFA500');
        
        // HPC applications
        this.addApplicationPoint('STREAM Triad', 0.25, 45, '#FF6B6B');
        this.addApplicationPoint('DGEMM', 16, 2800, '#4ECDC4');
        this.addApplicationPoint('FFT', 2.5, 380, '#45B7D1');
        
        this.showNotification('Intel Xeon configuration loaded successfully!', 'primary');
    }
    
    loadNvidiaGPUConfig() {
        this.clearAll();
        
        // GPU memory
        this.addMemoryBandwidth('HBM2e', 1555, '#76B900');
        this.addMemoryBandwidth('GDDR6X', 936, '#00BF63');
        
        // Compute capabilities
        this.addComputeCapability('A100 FP32', 19500, '#FF6F00');
        this.addComputeCapability('A100 Tensor', 156000, '#FF4081');
        this.addComputeCapability('RTX 4090', 83000, '#9C27B0');
        
        // GPU applications
        this.addApplicationPoint('CUDA Matrix Mul', 45, 18000, '#E91E63');
        this.addApplicationPoint('Deep Learning Training', 80, 145000, '#9C27B0');
        this.addApplicationPoint('Molecular Dynamics', 1.2, 950, '#2196F3');
        
        this.showNotification('NVIDIA GPU configuration loaded successfully!', 'success');
    }
    
    loadDefaultConfiguration() {
        // Load Apple Silicon as default
        this.loadAppleSiliconConfig();
    }
    
    clearAll() {
        this.memoryBandwidths = [];
        this.computeCapabilities = [];
        this.applicationPoints = [];
        this.updateChart();
        this.updateBandwidthList();
        this.updateComputeList();
        this.updateApplicationList();
        this.updateRidgeAnalysis();
        this.updateApplicationAnalysis();
    }
    
    // Event handlers
    handleAddBandwidth(e) {
        e.preventDefault();
        const name = document.getElementById('bandwidth-name').value;
        const bandwidth = parseFloat(document.getElementById('bandwidth-value').value);
        const color = document.getElementById('bandwidth-color').value;
        
        if (this.addMemoryBandwidth(name, bandwidth, color)) {
            document.getElementById('add-bandwidth-form').reset();
            document.getElementById('bandwidth-color').value = this.getRandomColor();
        }
    }
    
    handleAddCompute(e) {
        e.preventDefault();
        const name = document.getElementById('compute-name').value;
        const peakFlops = parseFloat(document.getElementById('compute-value').value);
        const color = document.getElementById('compute-color').value;
        
        if (this.addComputeCapability(name, peakFlops, color)) {
            document.getElementById('add-compute-form').reset();
            document.getElementById('compute-color').value = this.getRandomColor();
        }
    }
    
    handleAddApplication(e) {
        e.preventDefault();
        const name = document.getElementById('app-name').value;
        const oi = parseFloat(document.getElementById('app-oi').value);
        const performance = parseFloat(document.getElementById('app-performance').value);
        const color = document.getElementById('app-color').value;
        
        if (this.addApplicationPoint(name, oi, performance, color)) {
            document.getElementById('add-application-form').reset();
            document.getElementById('app-color').value = this.getRandomColor();
        }
    }
    
    updateChartRange() {
        const oiMin = parseFloat(document.getElementById('oi-min').value);
        const oiMax = parseFloat(document.getElementById('oi-max').value);
        const perfMin = parseFloat(document.getElementById('perf-min').value);
        const perfMax = parseFloat(document.getElementById('perf-max').value);
        
        this.chart.options.scales.x.min = oiMin;
        this.chart.options.scales.x.max = oiMax;
        this.chart.options.scales.y.min = perfMin;
        this.chart.options.scales.y.max = perfMax;
        
        this.chart.update();
    }
    
    // Remove functions
    removeBandwidth(index) {
        this.memoryBandwidths.splice(index, 1);
        this.updateChart();
        this.updateBandwidthList();
        this.updateRidgeAnalysis();
    }
    
    removeCompute(index) {
        this.computeCapabilities.splice(index, 1);
        this.updateChart();
        this.updateComputeList();
        this.updateRidgeAnalysis();
    }
    
    removeApplication(index) {
        this.applicationPoints.splice(index, 1);
        this.updateChart();
        this.updateApplicationList();
        this.updateApplicationAnalysis();
    }
    
    // Validation functions
    validateBandwidth(bandwidth) {
        return !isNaN(bandwidth) && bandwidth > 0 && bandwidth <= 10000;
    }
    
    validateFlops(flops) {
        return !isNaN(flops) && flops > 0 && flops <= 1000000;
    }
    
    validateOI(oi) {
        return !isNaN(oi) && oi > 0 && oi <= 1000;
    }
    
    // Utility functions
    formatFlops(flops) {
        if (flops >= 1000000) return `${(flops/1000000).toFixed(1)} PFLOPS`;
        if (flops >= 1000) return `${(flops/1000).toFixed(1)} TFLOPS`;
        return `${flops.toFixed(1)} GFLOPS`;
    }
    
    getRandomColor() {
        const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22', '#34495e'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification is-${type} is-light`;
        notification.innerHTML = `
            <button class="delete"></button>
            ${message}
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Position notification
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '9999';
        notification.style.maxWidth = '300px';
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
        
        // Manual close button
        const deleteBtn = notification.querySelector('.delete');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                notification.remove();
            });
        }
    }
}

// Initialize simulator when page loads
let simulator;

document.addEventListener('DOMContentLoaded', function() {
    simulator = new RooflineSimulator();
});
