let currentYear, currentMonth;
let activitiesData = [];
let historyData = [];

document.addEventListener('DOMContentLoaded', function() {
  const today = new Date();
  currentYear = today.getFullYear();
  currentMonth = today.getMonth();
  
  const cacheBuster = '?' + Date.now();
  
  Promise.all([
    fetch('data/profile.json' + cacheBuster).then(r => r.json()),
    fetch('data/history.json' + cacheBuster).then(r => r.json()),
    fetch('data/activities.json' + cacheBuster).then(r => r.json())
  ]).then(([profileData, historyArr, activitiesArr]) => {
    activitiesData = activitiesArr || [];
    historyData = historyArr || [];
    renderProfile(profileData.profile);
    renderScore(profileData.score);
    renderBodyMetrics(profileData.bodyMetrics);
    renderBodyComposition(profileData.bodyComposition);
    renderAssessment(profileData.assessment);
    renderSegmentalData(profileData.segmentalFat, profileData.segmentalMuscle);
    renderCalendar(currentYear, currentMonth);
  }).catch(error => {
    console.error('Error loading health data:', error);
  });
  
  document.getElementById('prev-month').addEventListener('click', function() {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentYear, currentMonth);
  });
  
  document.getElementById('next-month').addEventListener('click', function() {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentYear, currentMonth);
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

function getCategoryLabel(category) {
  const labels = {
    'exercise': '运动',
    'bad_eating': '乱吃',
    'warning': '警告'
  };
  return labels[category] || category;
}

function renderCalendar(year, month) {
  const container = document.getElementById('calendar-container');
  if (!container) return;
  
  document.getElementById('current-month').textContent = `${year}年${month + 1}月`;

  const today = new Date();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();

  const activityMap = new Map();
  activitiesData.forEach(activity => {
    if (!activityMap.has(activity.date)) {
      activityMap.set(activity.date, []);
    }
    activityMap.get(activity.date).push(activity);
  });

  const categoryPriority = { 'bad_eating': 3, 'warning': 2, 'exercise': 1 };

  const dayNames = ['日', '一', '二', '三', '四', '五', '六'];
  
  let headerHTML = '<div class="calendar-header-row">';
  dayNames.forEach(name => {
    headerHTML += `<div class="calendar-day-name">${name}</div>`;
  });
  headerHTML += '</div>';

  let calendarHTML = '<div class="calendar-grid">';
  
  for (let i = 0; i < startDayOfWeek; i++) {
    calendarHTML += '<div class="calendar-day other-month"></div>';
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayActivities = activityMap.get(dateStr) || [];
    const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
    
    let className = 'calendar-day';
    if (isToday) className += ' today';
    
    if (dayActivities.length > 0) {
      const dominant = dayActivities.reduce((max, act) => 
        (categoryPriority[act.category] || 0) > (categoryPriority[max.category] || 0) ? act : max
      );
      className += ` ${dominant.category}`;
    }

    let labelsHTML = '';
    let tooltipHTML = '';
    if (dayActivities.length > 0) {
      labelsHTML = '<div class="calendar-day-labels">';
      dayActivities.forEach(act => {
        labelsHTML += `<span class="calendar-day-label ${act.category}">${act.type}</span>`;
      });
      labelsHTML += '</div>';
      const tooltipText = dayActivities.map(act => `${act.type} (${getCategoryLabel(act.category)})`).join('，');
      tooltipHTML = `<div class="calendar-tooltip">${dateStr}: ${tooltipText}</div>`;
    }

    calendarHTML += `
      <div class="${className}">
        <span class="calendar-day-number">${day}</span>
        ${labelsHTML}
        ${tooltipHTML}
      </div>
    `;
  }

  const remainingCells = 42 - (startDayOfWeek + daysInMonth);
  for (let i = 0; i < remainingCells; i++) {
    calendarHTML += '<div class="calendar-day other-month"></div>';
  }

  calendarHTML += '</div>';
  container.innerHTML = headerHTML + calendarHTML;
}
