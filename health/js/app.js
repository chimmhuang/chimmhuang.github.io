document.addEventListener('DOMContentLoaded', function() {
  const cacheBuster = '?' + Date.now();
  fetch('data/health_data.json' + cacheBuster)
    .then(response => response.json())
    .then(data => {
      renderProfile(data.profile);
      renderScore(data.score);
      renderBodyMetrics(data.bodyMetrics);
      renderBodyComposition(data.bodyComposition);
      renderAssessment(data.assessment);
      renderSegmentalData(data.segmentalFat, data.segmentalMuscle);
      renderChart(data.history, 7);
    })
    .catch(error => {
      console.error('Error loading health data:', error);
    });
});

function renderProfile(profile) {
  document.getElementById('profile-gender').textContent = profile.gender;
  document.getElementById('profile-age').textContent = profile.age;
  document.getElementById('profile-height').textContent = profile.height;
  document.getElementById('profile-date').textContent = profile.measurementDate;
}

function renderScore(score) {
  document.getElementById('score-value').textContent = score.total;
  document.getElementById('score-advice').textContent = score.advice;
}

function getLevelClass(level) {
  const levelMap = {
    '正常': 'level-normal',
    '标准': 'level-normal',
    '偏瘦': 'level-low',
    '偏低': 'level-low',
    '心率过低': 'level-low',
    '超重': 'level-warning',
    '偏胖': 'level-warning',
    '偏高': 'level-warning',
    '警戒': 'level-warning',
    '肥胖': 'level-danger',
    '过高': 'level-danger',
    '危险': 'level-danger',
    '稍多': 'level-high',
    '优': 'level-normal'
  };
  return levelMap[level] || 'level-normal';
}

function getProgressColor(level) {
  const colorMap = {
    '正常': 'progress-green',
    '标准': 'progress-green',
    '偏瘦': 'progress-blue',
    '偏低': 'progress-blue',
    '心率过低': 'progress-blue',
    '超重': 'progress-yellow',
    '偏胖': 'progress-yellow',
    '偏高': 'progress-yellow',
    '警戒': 'progress-orange',
    '肥胖': 'progress-red',
    '过高': 'progress-red',
    '危险': 'progress-red',
    '稍多': 'progress-orange',
    '优': 'progress-green'
  };
  return colorMap[level] || 'progress-green';
}

function getProgressWidth(level, ranges) {
  const index = ranges.indexOf(level);
  if (index === -1) return 50;
  return ((index + 1) / ranges.length) * 100;
}

function renderBodyMetrics(metrics) {
  const weight = metrics.weight;
  const weightJin = (weight.value * 2).toFixed(1);
  document.getElementById('metric-weight').innerHTML = `${weightJin}斤 <span class="level-badge ${getLevelClass(weight.level)}">${weight.level}</span>`;
  document.getElementById('progress-weight').className = `progress-fill ${getProgressColor(weight.level)}`;
  document.getElementById('progress-weight').style.width = `${getProgressWidth(weight.level, weight.range)}%`;

  const bmi = metrics.bmi;
  document.getElementById('metric-bmi').innerHTML = `${bmi.value} <span class="level-badge ${getLevelClass(bmi.level)}">${bmi.level}</span>`;
  document.getElementById('progress-bmi').className = `progress-fill ${getProgressColor(bmi.level)}`;
  document.getElementById('progress-bmi').style.width = `${getProgressWidth(bmi.level, bmi.range)}%`;

  const fatRate = metrics.bodyFatRate;
  document.getElementById('metric-fat').innerHTML = `${fatRate.value}% <span class="level-badge ${getLevelClass(fatRate.level)}">${fatRate.level}</span>`;
  document.getElementById('progress-fat').className = `progress-fill ${getProgressColor(fatRate.level)}`;
  document.getElementById('progress-fat').style.width = `${getProgressWidth(fatRate.level, fatRate.range)}%`;

  const heartRate = metrics.heartRate;
  document.getElementById('metric-heart').innerHTML = `${heartRate.value}${heartRate.unit} <span class="level-badge ${getLevelClass(heartRate.level)}">${heartRate.level}</span>`;
  document.getElementById('progress-heart').className = `progress-fill ${getProgressColor(heartRate.level)}`;
  document.getElementById('progress-heart').style.width = `${getProgressWidth(heartRate.level, heartRate.range)}%`;
}

function renderBodyComposition(composition) {
  document.getElementById('comp-water').textContent = composition.water.value;
  document.getElementById('badge-water').textContent = composition.water.level;
  document.getElementById('badge-water').className = `level-badge ${getLevelClass(composition.water.level)}`;

  document.getElementById('comp-protein').textContent = composition.protein.value;
  document.getElementById('badge-protein').textContent = composition.protein.level;
  document.getElementById('badge-protein').className = `level-badge ${getLevelClass(composition.protein.level)}`;

  document.getElementById('comp-fat').textContent = composition.fat.value;
  document.getElementById('badge-fat').textContent = composition.fat.level;
  document.getElementById('badge-fat').className = `level-badge ${getLevelClass(composition.fat.level)}`;

  document.getElementById('comp-bone').textContent = composition.bone.value;
  document.getElementById('badge-bone').textContent = composition.bone.level;
  document.getElementById('badge-bone').className = `level-badge ${getLevelClass(composition.bone.level)}`;

  document.getElementById('comp-muscle').textContent = composition.muscle.value;
  document.getElementById('badge-muscle').textContent = composition.muscle.level;
  document.getElementById('badge-muscle').className = `level-badge ${getLevelClass(composition.muscle.level)}`;

  document.getElementById('comp-visceral').textContent = composition.visceralFat.value;
  document.getElementById('badge-visceral').textContent = composition.visceralFat.level;
  document.getElementById('badge-visceral').className = `level-badge ${getLevelClass(composition.visceralFat.level)}`;

  document.getElementById('comp-metabolism').textContent = composition.basalMetabolism.value;
}

function renderAssessment(assessment) {
  document.getElementById('assess-shape').textContent = assessment.bodyShape;
  document.getElementById('assess-type').textContent = assessment.bodyType;
  document.getElementById('assess-whr').textContent = assessment.waistHipRatio;
  document.getElementById('assess-age').textContent = assessment.bodyAge + '岁';
  document.getElementById('assess-skeletal').textContent = assessment.skeletalMuscleIndex;
  document.getElementById('assess-calorie').textContent = assessment.suggestedCalorieIntake + 'kcal';
}

function renderSegmentalData(fat, muscle) {
  document.getElementById('fat-left-arm').innerHTML = fat.leftArm + 'kg<br><span style="font-size:11px;color:#999">左上肢</span>';
  document.getElementById('fat-right-arm').innerHTML = fat.rightArm + 'kg<br><span style="font-size:11px;color:#999">右上肢</span>';
  document.getElementById('fat-trunk').innerHTML = fat.trunk + 'kg<br><span style="font-size:11px;color:#999">躯干</span>';
  document.getElementById('fat-left-leg').innerHTML = fat.leftLeg + 'kg<br><span style="font-size:11px;color:#999">左下肢</span>';
  document.getElementById('fat-right-leg').innerHTML = fat.rightLeg + 'kg<br><span style="font-size:11px;color:#999">右下肢</span>';

  document.getElementById('muscle-left-arm').innerHTML = muscle.leftArm + 'kg<br><span style="font-size:11px;color:#999">左上肢</span>';
  document.getElementById('muscle-right-arm').innerHTML = muscle.rightArm + 'kg<br><span style="font-size:11px;color:#999">右上肢</span>';
  document.getElementById('muscle-trunk').innerHTML = muscle.trunk + 'kg<br><span style="font-size:11px;color:#999">躯干</span>';
  document.getElementById('muscle-left-leg').innerHTML = muscle.leftLeg + 'kg<br><span style="font-size:11px;color:#999">左下肢</span>';
  document.getElementById('muscle-right-leg').innerHTML = muscle.rightLeg + 'kg<br><span style="font-size:11px;color:#999">右下肢</span>';
}

function renderChart(history, days) {
  const displayData = history.slice(-days);
  
  const ctx = document.getElementById('trendChart').getContext('2d');
  const dates = displayData.map(item => item.date.slice(5));
  const weights = displayData.map(item => (item.weight * 2).toFixed(1));
  const fatRates = displayData.map(item => item.bodyFatRate);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: '体重 (斤)',
          data: weights,
          borderColor: '#667eea',
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          tension: 0.4,
          fill: true,
          yAxisID: 'y'
        },
        {
          label: '体脂率 (%)',
          data: fatRates,
          borderColor: '#ff9800',
          backgroundColor: 'rgba(255, 152, 0, 0.1)',
          tension: 0.4,
          fill: true,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          position: 'top'
        }
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: '体重 (斤)'
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          title: {
            display: true,
            text: '体脂率 (%)'
          },
          min: 20,
          max: 28,
          grid: {
            drawOnChartArea: false
          }
        }
      }
    }
  });
}

function changeTimeRange(days) {
  const cacheBuster = '?' + Date.now();
  fetch('data/health_data.json' + cacheBuster)
    .then(response => response.json())
    .then(data => {
      const ctx = document.getElementById('trendChart').getContext('2d');
      if (window.chartInstance) {
        window.chartInstance.destroy();
      }
      window.chartInstance = renderChart(data.history, days);
    })
    .catch(error => {
      console.error('Error loading health data:', error);
    });
}