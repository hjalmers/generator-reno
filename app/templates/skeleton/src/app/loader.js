(function (window) {
    'use strict';
    var loaderAngle = 0;
    var loaderIncrement = 1;
    var loaderCtx, loaderCanvas;
    var loaderOut = true;
    var loaderMod = 0;
    var loaderBlur = 3;
    var a = 300,
        b = 425;
    var loaderW = 75;
    var barrier = 63;
    var loaderHandle;

    function startLoader() {
        loaderCanvas = document.getElementById('garbo-loader');
        loaderCtx = loaderCanvas.getContext('2d');
        var loaderHandle = setInterval(animateLoader, 15);

    }

    function stopLoader() {
        clearInterval(loaderHandle);
        loaderCanvas.style.display = 'none';
    }

    function drawLoaderPart(x, y, angle) {
        loaderCtx.save();
        loaderCtx.scale(0.2, 0.2);
        loaderCtx.translate(x, y);
        loaderCtx.rotate(angle * (Math.PI / 180));
        drawGarboG(loaderCtx);
        loaderCtx.restore();
    }

    function animateLoader() {
        //loaderCanvas.style.webkitFilter = "blur(" + loaderBlur +  "px)";
        //loaderCtx.fillStyle = "#rgba(255,255,255,0)";
        //loaderCtx.globalAlpha='0.35';
        //var curr = loaderCtx.globalCompositeOperation;
        //loaderCtx.globalCompositeOperation = "xor";
        loaderCtx.clearRect(0, 0, 200, 200);
        loaderCtx.globalAlpha = 1.0;
        //loaderCtx.globalCompositeOperation = curr;
        loaderCtx.save();
        loaderCtx.translate(loaderW, loaderW);
        loaderCtx.rotate(loaderAngle * (Math.PI / 180));
        loaderCtx.translate(-loaderW, -loaderW);

        drawLoaderPart(a, a + loaderMod);
        drawLoaderPart(b - loaderMod, a, 90);
        drawLoaderPart(b, b - loaderMod, 180);
        drawLoaderPart(a + loaderMod, b, 270);

        loaderCtx.restore();

        loaderAngle -= loaderIncrement;

        if (loaderAngle === 0) {
            loaderAngle = 360;
        }
        if (loaderMod <= -160 || loaderMod >= 0) {
            loaderOut = !loaderOut;
            if (loaderOut && loaderBlur > 0) {
                loaderBlur--;
            } else if (loaderOut) {
                loaderBlur++;
            }
        }

        loaderMod += loaderOut ? -loaderEase(-150, 3) : loaderEase(-150, 3);

    }

    function loaderEase(upper, lower) {
        var diff = upper + Math.abs(loaderMod);
        var perc = diff / upper;
        if (loaderOut) {
            return 0.5 + loaderIncrement * perc;
            /*if (perc <=0.1) {
                return 1;
            } else if (perc <= 0.3) {
                return 2;
            }
            return 3;*/
        } else {
            return Math.max(0.5, loaderIncrement - loaderIncrement * perc);
            /*if (perc >=0.9) {
                return 1;
            } else if (perc >= 0.7) {
                return 2;
            }
            return 3;*/
        }
    }
    var drawGarboG = function (loaderCtx) {
        loaderCtx.save();
        loaderCtx.translate(0, 0);
        loaderCtx.beginPath();
        loaderCtx.moveTo(0, 0);
        loaderCtx.lineTo(300, 0);
        loaderCtx.lineTo(300, 300);
        loaderCtx.lineTo(0, 300);
        loaderCtx.closePath();
        loaderCtx.clip();
        loaderCtx.translate(0, 0);
        loaderCtx.translate(0, 0);
        loaderCtx.scale(1, 1);
        loaderCtx.translate(0, 0);
        loaderCtx.strokeStyle = 'rgba(0,0,0,0)';
        loaderCtx.lineCap = 'butt';
        loaderCtx.lineJoin = 'miter';
        loaderCtx.miterLimit = 4;
        loaderCtx.save();
        loaderCtx.save();
        loaderCtx.fillStyle = '#ffffff';
        loaderCtx.beginPath();
        loaderCtx.moveTo(237.539, 248.872);
        loaderCtx.bezierCurveTo(245.619, 241.376, 251.201, 232.673, 254.437, 222.913);
        loaderCtx.bezierCurveTo(257.683, 213.144, 258.583, 202.309, 257.270, 190.525);
        loaderCtx.bezierCurveTo(256.151, 180.048, 252.826, 170.754, 248.302, 161.892);
        loaderCtx.bezierCurveTo(243.779, 153.033, 238.044, 144.622, 232.076, 135.903);
        loaderCtx.lineTo(232.805, 135.175);
        loaderCtx.lineTo(233.534, 134.446);
        loaderCtx.bezierCurveTo(243.077, 144.027, 252.75, 153.795, 262.629, 163.745);
        loaderCtx.bezierCurveTo(272.5, 173.706, 282.568, 183.854, 292.920, 194.205);
        loaderCtx.bezierCurveTo(292.032, 194.104, 291.352, 194.051, 290.791, 193.99);
        loaderCtx.bezierCurveTo(290.214, 193.936, 289.755, 193.884, 289.295, 193.807);
        loaderCtx.bezierCurveTo(285.895, 193.262, 282.787, 193.442, 280.027, 194.446);
        loaderCtx.bezierCurveTo(277.271, 195.442, 274.871, 197.245, 272.881, 199.947);
        loaderCtx.bezierCurveTo(271.111, 202.366, 269.264, 204.741, 267.527, 207.178);
        loaderCtx.bezierCurveTo(265.788, 209.62, 264.152, 212.11, 262.786, 214.764);
        loaderCtx.bezierCurveTo(259.415, 221.36, 255.668, 227.62, 251.555, 233.547);
        loaderCtx.bezierCurveTo(247.432, 239.458, 242.923, 245.024, 237.985, 250.197);
        loaderCtx.fill();
        loaderCtx.stroke();
        loaderCtx.restore();
        loaderCtx.save();
        loaderCtx.fillStyle = '#ffffff';
        loaderCtx.beginPath();
        loaderCtx.moveTo(163.627, 117.742);
        loaderCtx.lineTo(163.134, 117.252);
        loaderCtx.lineTo(162.641, 116.761);
        loaderCtx.bezierCurveTo(164.239, 114.48, 165.735, 112.132, 167.074, 109.691);
        loaderCtx.bezierCurveTo(168.426, 107.268, 169.621, 104.745, 170.629, 102.106);
        loaderCtx.bezierCurveTo(172.023, 98.435, 172.962, 94.733, 173.228, 90.996);
        loaderCtx.bezierCurveTo(173.469, 87.261, 173.036, 83.487, 171.683, 79.672);
        loaderCtx.bezierCurveTo(170.890, 77.428, 169.765, 75.162, 168.342, 72.95);
        loaderCtx.bezierCurveTo(166.928, 70.744, 165.205, 68.6, 163.228, 66.614);
        loaderCtx.bezierCurveTo(163.224, 66.612, 163.219, 66.606, 163.219, 66.606);
        loaderCtx.bezierCurveTo(163.219, 66.606, 163.219, 66.606, 163.219, 66.593);
        loaderCtx.bezierCurveTo(163.211, 66.593, 163.211, 66.593, 163.211, 66.593);
        loaderCtx.bezierCurveTo(163.206, 66.593, 163.202, 66.593, 163.202, 66.584);
        loaderCtx.bezierCurveTo(163.127, 66.517, 163.043, 66.442, 162.975, 66.369);
        loaderCtx.bezierCurveTo(162.901, 66.3, 162.821, 66.228, 162.749, 66.17);
        loaderCtx.lineTo(163, 65.911);
        loaderCtx.lineTo(163.25, 65.662);
        loaderCtx.bezierCurveTo(164.375, 66.354, 165.521, 67.037, 166.676, 67.694);
        loaderCtx.bezierCurveTo(167.838, 68.349, 169.014, 68.986, 170.2, 69.584);
        loaderCtx.bezierCurveTo(177.582, 73.334, 184.762, 75.157, 191.722, 74.859);
        loaderCtx.bezierCurveTo(198.681, 74.556, 205.418, 72.12, 211.916, 67.349);
        loaderCtx.bezierCurveTo(212.02, 67.276, 212.112, 67.203, 212.226, 67.121);
        loaderCtx.bezierCurveTo(212.324, 67.043, 212.435, 66.964, 212.548, 66.864);
        loaderCtx.lineTo(213.028, 67.361);
        loaderCtx.lineTo(213.52, 67.853);
        loaderCtx.bezierCurveTo(205.21, 76.16, 196.912, 84.458, 188.593, 92.776);
        loaderCtx.bezierCurveTo(180.283, 101.086, 171.961, 109.41, 163.627, 117.742);
        loaderCtx.fill();
        loaderCtx.stroke();
        loaderCtx.restore();
        loaderCtx.save();
        loaderCtx.fillStyle = '#ffffff';
        loaderCtx.beginPath();
        loaderCtx.moveTo(230.4, 254.723);
        loaderCtx.bezierCurveTo(223.935, 259.401, 216.986, 261.969, 209.701, 262.839);
        loaderCtx.bezierCurveTo(202.417, 263.709, 194.798, 262.874, 186.986, 260.768);
        loaderCtx.bezierCurveTo(178.832, 258.565, 171.174, 255.283, 163.87, 251.27);
        loaderCtx.bezierCurveTo(156.557, 247.317, 149.601, 242.62, 142.835, 237.582);
        loaderCtx.bezierCurveTo(135.375, 232.018, 128.198, 226.158, 121.282, 220.012);
        loaderCtx.bezierCurveTo(114.365, 213.874, 107.703, 207.462, 101.272, 200.811);
        loaderCtx.lineTo(101.289, 200.805);
        loaderCtx.lineTo(101.302, 200.794);
        loaderCtx.bezierCurveTo(101.206, 200.708, 101.114, 200.614, 101.03, 200.52);
        loaderCtx.bezierCurveTo(100.934, 200.448, 100.846, 200.356, 100.759, 200.268);
        loaderCtx.bezierCurveTo(100.663, 200.177, 100.579, 200.083, 100.487, 199.997);
        loaderCtx.bezierCurveTo(100.399, 199.911, 100.316, 199.816, 100.228, 199.719);
        loaderCtx.lineTo(100.22, 199.729);
        loaderCtx.lineTo(100.212, 199.737);
        loaderCtx.bezierCurveTo(93.563, 193.307, 87.149, 186.649, 81.009, 179.733);
        loaderCtx.bezierCurveTo(74.862, 172.821, 68.991, 165.651, 63.438, 158.182);
        loaderCtx.bezierCurveTo(58.398, 151.417, 53.698, 144.457, 49.717, 137.152);
        loaderCtx.bezierCurveTo(45.724, 129.838, 42.453, 122.188, 40.258, 114.029);
        loaderCtx.bezierCurveTo(38.142, 106.226, 37.31, 98.598, 38.175, 91.316);
        loaderCtx.bezierCurveTo(39.045, 84.027, 41.616, 77.078, 46.3, 70.614);
        loaderCtx.bezierCurveTo(54.057, 59.886, 63.425, 52.421, 74.178, 48.022);
        loaderCtx.bezierCurveTo(84.944, 43.624, 97.108, 42.26, 110.482, 43.715);
        loaderCtx.bezierCurveTo(120.961, 44.861, 130.257, 48.173, 139.118, 52.708);
        loaderCtx.bezierCurveTo(147.98, 57.239, 156.392, 62.97, 165.107, 68.936);
        loaderCtx.lineTo(165.836, 68.202);
        loaderCtx.lineTo(166.565, 67.472);
        loaderCtx.bezierCurveTo(156.998, 57.943, 147.225, 48.262, 137.267, 38.393);
        loaderCtx.bezierCurveTo(127.31, 28.516, 117.154, 18.43, 106.808, 8.084);
        loaderCtx.bezierCurveTo(106.904, 8.983, 106.963, 9.66, 107.017, 10.23);
        loaderCtx.bezierCurveTo(107.067, 10.798, 107.126, 11.263, 107.205, 11.71);
        loaderCtx.bezierCurveTo(107.753, 15.11, 107.568, 18.221, 106.569, 20.973);
        loaderCtx.bezierCurveTo(105.566, 23.733, 103.759, 26.138, 101.054, 28.128);
        loaderCtx.bezierCurveTo(98.654, 29.893, 96.274, 31.741, 93.836, 33.485);
        loaderCtx.bezierCurveTo(91.398, 35.229, 88.897, 36.86, 86.25, 38.223);
        loaderCtx.bezierCurveTo(74.97, 43.999, 64.64, 50.8, 55.411, 58.827);
        loaderCtx.bezierCurveTo(46.182, 66.85, 38.057, 76.1, 31.187, 86.787);
        loaderCtx.bezierCurveTo(22.401, 100.466, 15.89, 114.802, 12.072, 129.919);
        loaderCtx.bezierCurveTo(8.25, 145.028, 7.116, 160.916, 9.082, 177.71);
        loaderCtx.bezierCurveTo(10.78, 192.125, 15.279, 206.011, 22.02, 218.71);
        loaderCtx.bezierCurveTo(28.748, 231.432, 37.714, 242.981, 48.319, 252.695);
        loaderCtx.bezierCurveTo(58.046, 263.299, 69.591, 272.263, 82.299, 278.996);
        loaderCtx.bezierCurveTo(95.007, 285.729, 108.891, 290.236, 123.31, 291.927);
        loaderCtx.bezierCurveTo(140.1, 293.893, 155.991, 292.764, 171.103, 288.946);
        loaderCtx.bezierCurveTo(186.211, 285.124, 200.55, 278.614, 214.226, 269.828);
        loaderCtx.bezierCurveTo(219.293, 266.569, 224.051, 263.028, 228.494, 259.219);
        loaderCtx.bezierCurveTo(232.935, 255.407, 237.083, 251.328, 240.956, 247.009);
        loaderCtx.lineTo(240.575, 246.634);
        loaderCtx.lineTo(240.195, 246.256);
        loaderCtx.bezierCurveTo(238.757, 247.757, 237.226, 249.212, 235.583, 250.621);
        loaderCtx.bezierCurveTo(233.959, 252.034, 232.225, 253.4, 230.4, 254.723);
        loaderCtx.fill();
        loaderCtx.stroke();
        loaderCtx.restore();
        loaderCtx.save();
        loaderCtx.fillStyle = '#ffffff';
        loaderCtx.beginPath();
        loaderCtx.moveTo(183.098, 137.208);
        loaderCtx.lineTo(183.591, 137.708);
        loaderCtx.lineTo(184.084, 138.206);
        loaderCtx.bezierCurveTo(186.363, 136.604, 188.705, 135.111, 191.139, 133.759);
        loaderCtx.bezierCurveTo(193.574, 132.426, 196.094, 131.229, 198.733, 130.217);
        loaderCtx.bezierCurveTo(202.405, 128.82, 206.102, 127.885, 209.844, 127.626);
        loaderCtx.bezierCurveTo(213.583, 127.381, 217.35, 127.806, 221.18, 129.171);
        loaderCtx.bezierCurveTo(223.413, 129.951, 225.686, 131.082, 227.884, 132.5);
        loaderCtx.bezierCurveTo(230.091, 133.917, 232.238, 135.639, 234.223, 137.623);
        loaderCtx.lineTo(234.237, 137.629);
        loaderCtx.lineTo(234.246, 137.631);
        loaderCtx.bezierCurveTo(234.254, 137.638, 234.254, 137.644, 234.254, 137.644);
        loaderCtx.bezierCurveTo(234.254, 137.644, 234.254, 137.644, 234.260, 137.648);
        loaderCtx.bezierCurveTo(234.33, 137.724, 234.406, 137.793, 234.472, 137.868);
        loaderCtx.bezierCurveTo(234.539, 137.944, 234.611, 138.021, 234.683, 138.096);
        loaderCtx.lineTo(234.933, 137.846);
        loaderCtx.lineTo(235.183, 137.589);
        loaderCtx.bezierCurveTo(234.491, 136.466, 233.808, 135.326, 233.156, 134.172);
        loaderCtx.bezierCurveTo(232.5, 133.001, 231.859, 131.826, 231.254, 130.634);
        loaderCtx.bezierCurveTo(227.522, 123.251, 225.69, 116.071, 225.988, 109.114);
        loaderCtx.bezierCurveTo(226.289, 102.157, 228.716, 95.417, 233.486, 88.928);
        loaderCtx.bezierCurveTo(233.566, 88.824, 233.654, 88.723, 233.728, 88.623);
        loaderCtx.bezierCurveTo(233.808, 88.51, 233.892, 88.404, 233.966, 88.299);
        loaderCtx.lineTo(233.478, 87.801);
        loaderCtx.lineTo(232.988, 87.312);
        loaderCtx.bezierCurveTo(224.679, 95.621, 216.379, 103.932, 208.06, 112.244);
        loaderCtx.bezierCurveTo(199.753, 120.55, 191.432, 128.874, 183.098, 137.208);
        loaderCtx.fill();
        loaderCtx.stroke();
        loaderCtx.restore();
        loaderCtx.restore();
        loaderCtx.restore();
    };

    window.loader = {
        startLoader: startLoader,
        stopLoader: stopLoader
    };
}(window));
