class spam {
  constructor() {
    this.enable    = 0;
    this.frequency = 3;
  }

  // I\O
  setFrequency(f) {
    this.frequency = f;
  }

  // Spam functionality
  proceed(str) {
    let frequencyCheck = (str) => {
      let times = this.frequency;

      for (let i=0; i<times; i++) {
      	let reverted = str.split('').reverse();
      	let newArr = [];

        reverted.forEach(function(char, i1) {
          let bundle = makeBundle(reverted, i1				, times);
          let future = makeBundle(reverted, i1 + times, times);

          if (bundle !== future) {
            newArr.push(char);
          }
      	});
        str = newArr.reverse().join('');
      }

    	return str;
    };

    let makeBundle = (arr, i, times) => {
    	let bundleStr = [];

      for (let c=0; c<times; c++) {
      	bundleStr.push((arr[i+c] || ''));
      }

      bundleStr = bundleStr.join('');
     	return bundleStr;
    };

    return frequencyCheck(str.replace(/(.)\1{3,}/g, '$1$1$1'));
  }
};
