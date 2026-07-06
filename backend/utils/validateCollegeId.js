const validateCollegeId = (collegeId) => {
    const regex = /^(200[0-9]|201[0-9]|202[0-6])(UEC|UCP|UEC|UEE|UME|UCE|UCH|UMT|UAR|UAI)[0-9]{4}$/;
    
    return regex.test(collegeId);
  };

// console.log(validateCollegeId("2024UEC1469")); // true
// console.log(validateCollegeId("2027UEC1469")); // false
// console.log(validateCollegeId("2024ABC1469")); // false
// console.log(validateCollegeId("2024UEC14"));   // false
// console.log(validateCollegeId("2026UAI9999")); // true
  
  module.exports = validateCollegeId;