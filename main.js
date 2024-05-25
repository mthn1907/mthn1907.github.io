function isPrime(n, k = 15) {

    try {
        n = bigInt(n);
    } catch (e) {
        throw e;
    }

    // Temel kontroller
    if (n.lesserOrEquals(1)) {
        return false;
    }

    if (n.equals(2) || n.equals(3) || n.equals(5) || n.equals(7)) {
        return true;
    }

    // Modüler üs alma (modular exponentiation)
    function modPow(base, exponent, modulus) {
        base = bigInt(base);
        exponent = bigInt(exponent);
        modulus = bigInt(modulus);
        let result = bigInt(1);
        base = base.mod(modulus);
        while (exponent.greater(0)) {
            if (exponent.isOdd()) {
                result = result.multiply(base).mod(modulus);
            }
            exponent = exponent.divide(2);
            base = base.multiply(base).mod(modulus);
        }
        return result;
    }

    // Miller-Rabin testi için yardımcı fonksiyon
    function isStrongPrime(a, d, n, s) {
        let x = modPow(a, d, n);
        if (x.equals(1) || x.equals(n.minus(1))) {
            return true;
        }
        for (let i = 0; i < s.minus(1); i++) {
            x = modPow(x, 2, n);
            if (x.equals(n.minus(1))) {
                return true;
            }
            if (x.equals(1)) {
                return false;
            }
        }
        return false;
    }

    // n - 1 = 2^s * d yazılımı
    let d = n.minus(1);
    let s = bigInt(0);
    while (d.isEven()) {
        d = d.divide(2);
        s = s.add(1);
    }

    // Miller-Rabin testi
    for (let i = 0; i < k; i++) {
        let a = bigInt.randBetween(2, n.minus(3).divide(2));
        if (!isStrongPrime(a, d, n, s)) {
            return false;
        }
    }

    return true;
}

function nextPrime(n) {

    n = bigInt(n).mod(2).add(1).add(bigInt(n))

    if (n.lesserOrEquals(1)) {
        return bigInt(2).toString();
    }

    while (true) {
        if (isPrime(n)) {
            return n.toString();
        }
        n = n.add(2);
    }
}