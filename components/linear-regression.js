function LinearRegression(x, y){
  var slope;
  var intercept;
  var n = y.length;
  var sum_x = 0;
  var sum_y = 0;
  var sum_xy = 0;
  var sum_xx = 0;
  var sum_yy = 0;

  for (let i=0; i<y.length; i++){
    sum_x += x[i];
    sum_y += y[i];
    sum_xy += (x[i]*y[i]);
    sum_xx += (x[i]*x[i]);
    sum_yy += (y[i]*y[i]);
  }

  slope = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
  intercept = (sum_y - slope * sum_x)/n;

  //R^2 may be useful later.

  return [slope, intercept];
}