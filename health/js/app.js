document.addEventListener('DOMContentLoaded', function() {
  fetch('data/health_data.json')
    .then(response => response.json())
    .then(data => {
      renderProfile(data.profile);
      renderScore(data.score);
      renderBodyMetrics(data.bodyMetrics);
      renderBodyComposition(data.bodyComposition);
      renderAssessment(data.assessment);
      renderSegmentalData(data.segmentalFat, data.segmentalMuscle);
      renderChart(data.history);
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
  document.getElementById('metric-weight').innerHTML = `${weight.value}kg <span class="level-badge ${getLevelClass(weight.level)}">${weight.level}</span>`;
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
  document.getElementById('fat-left-arm').textContent = fat.leftArm + 'kg';
  document.getElementById('fat-right-arm').textContent = fat.rightArm + 'kg';
  document.getElementById('fat-trunk').textContent = fat.trunk + 'kg';
  document.getElementById('fat-left-leg').textContent = fat.leftLeg + 'kg';
  document.getElementById('fat-right-leg').textContent = fat.rightLeg + 'kg';

  document.getElementById('muscle-left-arm').textContent = muscle.leftArm + 'kg';
  document.getElementById('muscle-right-arm').textContent = muscle.rightArm + 'kg';
  document.getElementById('muscle-trunk').textContent = muscle.trunk + 'kg';
  document.getElementById('muscle-left-leg').textContent = muscle.leftLeg + 'kg';
  document.getElementById('muscle-right-leg').textContent = muscle.rightLeg + 'kg';
}

function renderChart(history) {
  const ctx = document.getElementById('trendChart').getContext('2d');
  const dates = history.map(item => item.date.slice(5));
  const weights = history.map(item => item.weight);
  const fatRates = history.map(item => item.bodyFatRate);
  const bmis = history.map(item => item.bmi);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: '体重 (kg)',
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
        },
        {
          label: 'BMI',
          data: bmis,
          borderColor: '#4caf50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          tension: 0.4,
          fill: true,
          yAxisID: 'y2'
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
            text: '体重 (kg)'
          },
          min: 80,
          max: 86
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          title: {
            display: true,
            text: '体脂率 (%)'
          },
          min: 22,
          max: 26,
          grid: {
            drawOnChartArea: false
          }
        },
        y2: {
          type: 'linear',
          display: false,
          min: 24,
          max: 28
        }
      }
    }
  });
}