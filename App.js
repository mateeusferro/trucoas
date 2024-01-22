import { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [counterUs, setCounterUs] = useState(0);
  const [counterThey, setCounterThey] = useState(0);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (winner) {
      const timeout = setTimeout(() => {
        resetCounters();
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [winner]);

  function verifyDecreaseCounterUs() {
    if (counterUs === 0) {
      return;
    }
    setCounterUs((prev) => prev - 1);
    setWinner(null); // Reset winner when someone scores
  }

  function verifyDecreaseCounterThey() {
    if (counterThey === 0) {
      return;
    }
    setCounterThey((prev) => prev - 1);
    setWinner(null); // Reset winner when someone scores
  }

  function verifyIncreaseCounterUs() {
    if (counterUs === 12) {
      return;
    } else if (counterUs === 11) {
      setWinner('Nós');
      setCounterUs((prev) => prev + 1);
    } else {
      setCounterUs((prev) => prev + 1);
    }
  }

  function verifyIncreaseCounterThey() {
    if (counterThey === 12) {
      return;
    } else if (counterThey === 11) {
      setWinner('Eles');
      setCounterThey((prev) => prev + 1);
    } else {
      setCounterThey((prev) => prev + 1);
    }
  }

  function resetCounters() {
    setCounterUs(0);
    setCounterThey(0);
    setWinner(null);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Bem-vindo ao contador de truco!</Text>

      <View style={styles.containerScores}>
        <View style={styles.scoreContainer}>
          <Text style={styles.textPlayersTitle}>Nós</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#FF6666' }]}
              onPress={() => verifyDecreaseCounterUs()}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.textCounter}>{counterUs}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#88CC88' }]}
              onPress={() => verifyIncreaseCounterUs()}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.scoreContainer}>
          <Text style={styles.textPlayersTitle}>Eles</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#FF6666' }]}
              onPress={() => verifyDecreaseCounterThey()}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.textCounter}>{counterThey}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#88CC88' }]}
              onPress={() => verifyIncreaseCounterThey()}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {winner && <Text style={styles.winnerText}>{winner} ganharam!</Text>}

      <View style={styles.resetButtonContainer}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => resetCounters()}
        >
          <Text style={styles.buttonText}>Reiniciar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  containerScores: {
    flexDirection: 'row',
    marginTop: 30,
  },
  scoreContainer: {
    marginTop: 180,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  textTitle: {
    fontSize: 23,
    marginTop: 60,
  },
  textPlayersTitle: {
    fontSize: 25,
    marginBottom: 10,
  },
  textCounter: {
    fontSize: 20,
  },
  winnerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'green',
  },
  buttonContainer: {
    marginVertical: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 40,
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  resetButton: {
    backgroundColor: '#3399FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  resetButtonContainer: {
    position: 'absolute',
    bottom: 20,
  },
});
